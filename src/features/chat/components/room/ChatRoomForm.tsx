'use client';

import { ReactNode, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Camera, Loader2, Pencil, Trash2 } from 'lucide-react';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PatchRoomSchema, patchRoomSchema } from '../../schemas/room.schema';
import { useFileAttachments } from '@/modules/forms/hooks/useFileAttachments';
import FormField from '@/modules/forms/components/Base/FormField';
import { AvatarProfile } from '@/features/user/components/Avatar/AvatarProfile';
import { FieldError } from '@/components/ui/field';
import { translateError } from '@/modules/forms/utils/translate/errors';
import { useChatRoomEdit } from '../../hooks/room/useChatRoomActions';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface EditGroupDetailsDialogProps {
	roomId: string;
	initialName: string;
	initialAvatarUrl?: string | null;
}

export const ChatRoomEditForm = ({
	roomId,
	initialName,
	initialAvatarUrl,
}: EditGroupDetailsDialogProps) => {
	const t = useTranslations('chat.rooms.group_settings');
	const rootT = useTranslations();
	const [open, setOpen] = useState(false);

	const { mutateAsync } = useChatRoomEdit(roomId);

	const {
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting, isValid },
	} = useForm<PatchRoomSchema>({
		resolver: zodResolver(patchRoomSchema),
		mode: 'onChange',
		defaultValues: {
			name: initialName,
			removeAvatar: false,
			avatarFile: undefined,
		},
	});

	const name = useWatch({ control, name: 'name' }) ?? '';
	const removeAvatar = useWatch({ control, name: 'removeAvatar' }) ?? false;
	const avatarFile = useWatch({ control, name: 'avatarFile' });

	const { fileInputRef, previews, handleFileChange, handleRemoveAttachment } =
		useFileAttachments({
			attachments: avatarFile,
			setValue,
			fieldName: 'avatarFile',
			maxFiles: 1,
		});

	const displayAvatarUrl = removeAvatar ? null : (previews[0]?.url ?? initialAvatarUrl);
	const isNameChanged = name.trim() !== initialName.trim();
	const isAvatarChanged = avatarFile instanceof File || removeAvatar;
	const hasChanges = isNameChanged || isAvatarChanged;

	const isSubmitDisabled = isSubmitting || !hasChanges || !isValid;

	const handleRemoveAvatarClick = () => {
		handleRemoveAttachment();
		setValue('removeAvatar', true, { shouldValidate: true, shouldDirty: true });
	};

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			reset({
				name: initialName,
				removeAvatar: false,
				avatarFile: undefined,
			});
		}
		setOpen(nextOpen);
	};

	const onSubmit = async (data: PatchRoomSchema) => {
		try {
			const updatedName = isNameChanged
				? data.name && data.name.trim().length > 0
					? data.name.trim()
					: null
				: undefined;

			await mutateAsync({
				name: updatedName,
				file: data.avatarFile,
				removeAvatar: data.removeAvatar,
			});

			setOpen(false);
		} catch {}
	};

	const avatarError = errors.avatarFile;

	return (
		<Tooltip>
			<Dialog open={open} onOpenChange={handleOpenChange}>
				<DialogTrigger asChild>
					<TooltipTrigger asChild>
						<Button
							variant='ghost'
							size='icon'
							className='size-8 text-muted-foreground hover:text-foreground'>
							<Pencil className='size-4' />
						</Button>
					</TooltipTrigger>
				</DialogTrigger>
				<DialogContent className='p-0 bg-card gap-0'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader className='p-4 space-y-2'>
							<DialogTitle className='text-lg font-semibold'>
								{t('title')}
							</DialogTitle>
							<DialogDescription>{t('description')}</DialogDescription>
						</DialogHeader>

						<div className='px-4 pb-2'>
							<div className='w-full space-y-6 p-3 bg-background rounded-lg border border-border/50'>
								<div className='flex flex-col items-center justify-center gap-y-2'>
									<div className='relative group'>
										<AvatarProfile
											img={{
												src: displayAvatarUrl,
												alt: name || initialName,
											}}
											size='3xl'
										/>

										<Button
											type='button'
											variant='ghost'
											size='icon'
											disabled={isSubmitting}
											aria-label={t('change_avatar_hint')}
											onClick={() => fileInputRef.current?.click()}
											className='absolute inset-0 size-full rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity p-0 border-none hover:bg-black/60 hover:text-white'>
											<Camera
												className='size-5'
												aria-hidden='true'
											/>
										</Button>

										<input
											ref={fileInputRef}
											type='file'
											tabIndex={-1}
											accept='image/*'
											className='sr-only'
											aria-label={t('change_avatar_hint')}
											disabled={isSubmitting}
											onChange={(e) => {
												setValue('removeAvatar', false);
												handleFileChange(e);
											}}
										/>
									</div>

									{displayAvatarUrl && (
										<Button
											type='button'
											variant='ghost'
											size='sm'
											aria-label={t('remove_avatar')}
											className='h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10'
											onClick={handleRemoveAvatarClick}>
											<Trash2
												className='size-3.5 mr-1'
												aria-hidden='true'
											/>
											{t('remove_avatar')}
										</Button>
									)}

									<span
										className='text-xs text-muted-foreground'
										aria-hidden='true'>
										{t('change_avatar_hint')}
									</span>

									{avatarError && (
										<FieldError
											className='text-center'
											errors={[translateError(rootT, avatarError)]}
										/>
									)}
								</div>

								<FormField
									control={control}
									field={{
										component: 'input',
										variant: 'default',
										name: 'name',
										label: {
											text: t('group_name_label'),
											className: 'text-sm font-medium pl-1',
										},
										placeholder: t('group_name_placeholder'),
										required: false,
									}}
								/>
							</div>
						</div>

						<DialogFooter className='px-4 py-3 border-t border-border bg-muted flex items-center justify-end gap-4'>
							<Button
								type='button'
								variant='outline'
								className='flex-1'
								disabled={isSubmitting}
								onClick={() => handleOpenChange(false)}>
								{t('cancel')}
							</Button>
							<Button
								type='submit'
								className='flex-1'
								disabled={isSubmitDisabled}>
								{isSubmitting && (
									<Loader2 className='size-4 mr-2 animate-spin' />
								)}
								{t('save')}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
			<TooltipContent side='bottom' className='text-xs'>
				Edit group details
			</TooltipContent>
		</Tooltip>
	);
};
