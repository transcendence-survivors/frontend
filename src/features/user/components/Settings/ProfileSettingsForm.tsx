'use client';

import { RefObject } from 'react';
import { Control, FieldError as RHFFieldError, useForm, useWatch } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/ui/field';
import FormField from '@/modules/forms/components/Base/FormField';
import { translateError } from '@/modules/forms/utils/translate/errors';
import { useFileAttachments } from '@/modules/forms/hooks/useFileAttachments';
import { AvatarProfile } from '@/features/user/components/Avatar/AvatarProfile';

import { usePatchUserSettings } from '../../hooks/usePatchUserSettings';
import {
	ProfileSettingsFormValues,
	profileSettingsSchema,
} from '../../schemas/profileSettings.schema';
import { PatchUserSettingsParams, UserSettings } from '../../type';

type ProfileCoverSectionProps = {
	displayCoverUrl: string | null;
	isSubmitting: boolean;
	coverInputRef: RefObject<HTMLInputElement | null>;
	error?: RHFFieldError;
	onCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemoveCover: () => void;
};

const ProfileCoverSection = ({
	displayCoverUrl,
	isSubmitting,
	coverInputRef,
	error,
	onCoverChange,
	onRemoveCover,
}: ProfileCoverSectionProps) => {
	const t = useTranslations('settings.profile');
	const rootT = useTranslations();

	return (
		<div className='space-y-2'>
			<label className='text-sm font-medium pl-1'>{t('cover_label')}</label>
			<div className='relative aspect-3/1 max-h-96 w-full rounded-lg bg-muted border border-border/50 overflow-hidden group'>
				{displayCoverUrl ? (
					<Image
						src={displayCoverUrl}
						alt='Cover'
						fill
						className='w-full h-full object-cover'
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center text-muted-foreground text-sm'>
						{t('no_cover')}
					</div>
				)}

				<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2'>
					<Button
						type='button'
						variant='secondary'
						size='sm'
						disabled={isSubmitting}
						onClick={() => coverInputRef.current?.click()}>
						<Camera className='size-4 mr-2' />
						{t('change_cover')}
					</Button>

					{displayCoverUrl && (
						<Button
							type='button'
							variant='destructive'
							size='sm'
							disabled={isSubmitting}
							onClick={onRemoveCover}>
							<Trash2 className='size-4 mr-2' />
							{t('remove_cover')}
						</Button>
					)}
				</div>

				<input
					ref={coverInputRef}
					type='file'
					tabIndex={-1}
					accept='image/*'
					className='sr-only'
					disabled={isSubmitting}
					onChange={onCoverChange}
				/>
			</div>
			{error && <FieldError errors={[translateError(rootT, error)]} />}
		</div>
	);
};

type ProfileAvatarSectionProps = {
	displayAvatarUrl: string | null;
	displayName: string;
	isSubmitting: boolean;
	avatarInputRef: RefObject<HTMLInputElement | null>;
	error?: RHFFieldError;
	onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemoveAvatar: () => void;
};

const ProfileAvatarSection = ({
	displayAvatarUrl,
	displayName,
	isSubmitting,
	avatarInputRef,
	error,
	onAvatarChange,
	onRemoveAvatar,
}: ProfileAvatarSectionProps) => {
	const t = useTranslations('settings.profile');
	const rootT = useTranslations();

	return (
		<div className='flex items-center gap-x-6 p-4 bg-background rounded-lg border border-border/50'>
			<div className='relative group shrink-0'>
				<AvatarProfile
					img={{
						src: displayAvatarUrl,
						alt: displayName,
					}}
					size='3xl'
				/>

				<Button
					type='button'
					variant='ghost'
					size='icon'
					disabled={isSubmitting}
					aria-label={t('change_avatar')}
					onClick={() => avatarInputRef.current?.click()}
					className='absolute inset-0 size-full rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity p-0 border-none hover:bg-black/60 hover:text-white'>
					<Camera className='size-5' aria-hidden='true' />
				</Button>

				<input
					ref={avatarInputRef}
					type='file'
					tabIndex={-1}
					accept='image/*'
					className='sr-only'
					aria-label={t('change_avatar')}
					disabled={isSubmitting}
					onChange={onAvatarChange}
				/>
			</div>

			<div className='space-y-1'>
				<div className='flex items-center gap-x-2'>
					<Button
						type='button'
						variant='outline'
						size='sm'
						disabled={isSubmitting}
						onClick={() => avatarInputRef.current?.click()}>
						{t('change_avatar')}
					</Button>

					{displayAvatarUrl && (
						<Button
							type='button'
							variant='ghost'
							size='sm'
							disabled={isSubmitting}
							className='text-destructive hover:text-destructive hover:bg-destructive/10'
							onClick={onRemoveAvatar}>
							<Trash2 className='size-4 mr-1' />
							{t('remove_avatar')}
						</Button>
					)}
				</div>
				<p className='text-xs text-muted-foreground'>{t('avatar_hint')}</p>
				{error && <FieldError errors={[translateError(rootT, error)]} />}
			</div>
		</div>
	);
};

type ProfileFieldsSectionProps = {
	control: Control<ProfileSettingsFormValues>;
};

const ProfileFieldsSection = ({ control }: ProfileFieldsSectionProps) => {
	const t = useTranslations('settings.profile');

	return (
		<div className='space-y-4 p-4 bg-background rounded-lg border border-border/50'>
			<FormField
				control={control}
				field={{
					component: 'input',
					variant: 'default',
					name: 'displayName',
					label: {
						text: t('display_name_label'),
						className: 'text-sm font-medium pl-1',
					},
					placeholder: t('display_name_placeholder'),
					required: false,
				}}
			/>

			<FormField
				control={control}
				field={{
					component: 'textarea',
					name: 'bio',
					label: {
						text: t('bio_label'),
						className: 'text-sm font-medium pl-1',
					},
					placeholder: t('bio_placeholder'),
					required: false,
					addon: {
						type: 'length',
						maxLength: 255,
						align: 'block-end',
					},
				}}
			/>
		</div>
	);
};

type ProfileSettingsFormProps = {
	user: Pick<UserSettings, 'displayName' | 'bio' | 'avatarUrl' | 'coverImageUrl'>;
};

export const ProfileSettingsForm = ({ user }: ProfileSettingsFormProps) => {
	const t = useTranslations('settings.profile');
	const { mutateAsync: patchSettings } = usePatchUserSettings();

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting, isValid, isDirty },
	} = useForm<ProfileSettingsFormValues>({
		resolver: zodResolver(profileSettingsSchema),
		mode: 'onChange',
		defaultValues: {
			displayName: user?.displayName ?? '',
			bio: user?.bio ?? '',
			removeAvatar: false,
			removeCover: false,
			avatarFile: undefined,
			coverFile: undefined,
		},
	});

	const removeAvatar = useWatch({ control, name: 'removeAvatar' }) ?? false;
	const removeCover = useWatch({ control, name: 'removeCover' }) ?? false;
	const avatarFile = useWatch({ control, name: 'avatarFile' });
	const coverFile = useWatch({ control, name: 'coverFile' });

	const {
		fileInputRef: avatarInputRef,
		previews: avatarPreviews,
		handleFileChange: handleAvatarChange,
		handleRemoveAttachment: handleRemoveAvatarAttachment,
	} = useFileAttachments({
		attachments: avatarFile,
		setValue,
		fieldName: 'avatarFile',
		maxFiles: 1,
	});

	const {
		fileInputRef: coverInputRef,
		previews: coverPreviews,
		handleFileChange: handleCoverChange,
		handleRemoveAttachment: handleRemoveCoverAttachment,
	} = useFileAttachments({
		attachments: coverFile,
		setValue,
		fieldName: 'coverFile',
		maxFiles: 1,
	});

	const displayAvatarUrl = removeAvatar
		? null
		: (avatarPreviews[0]?.url ?? user?.avatarUrl ?? null);

	const displayCoverUrl = removeCover
		? null
		: (coverPreviews[0]?.url ?? user?.coverImageUrl ?? null);

	const isSubmitDisabled = isSubmitting || !isDirty || !isValid;

	const handleRemoveAvatarClick = () => {
		handleRemoveAvatarAttachment();
		setValue('removeAvatar', true, { shouldValidate: true, shouldDirty: true });
	};

	const handleRemoveCoverClick = () => {
		handleRemoveCoverAttachment();
		setValue('removeCover', true, { shouldValidate: true, shouldDirty: true });
	};

	const onSubmit = async (data: ProfileSettingsFormValues) => {
		try {
			const payload: PatchUserSettingsParams = {};

			if (data.displayName !== undefined) {
				const trimmed = data.displayName.trim();
				payload.displayName = trimmed.length > 0 ? trimmed : undefined;
			}

			if (data.bio !== undefined) {
				const trimmed = data.bio.trim();
				payload.bio = trimmed.length > 0 ? trimmed : undefined;
			}

			if (removeAvatar) {
				payload.avatarFile = null;
			} else if (data.avatarFile) {
				payload.avatarFile = data.avatarFile;
			}

			if (removeCover) {
				payload.coverFile = null;
			} else if (data.coverFile) {
				payload.coverFile = data.coverFile;
			}

			await patchSettings(payload);
		} catch {}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6 max-w-2xl'>
			<ProfileCoverSection
				displayCoverUrl={displayCoverUrl}
				isSubmitting={isSubmitting}
				coverInputRef={coverInputRef}
				error={errors.coverFile}
				onCoverChange={(e) => {
					setValue('removeCover', false);
					handleCoverChange(e);
				}}
				onRemoveCover={handleRemoveCoverClick}
			/>

			<ProfileAvatarSection
				displayAvatarUrl={displayAvatarUrl}
				displayName={user?.displayName || ''}
				isSubmitting={isSubmitting}
				avatarInputRef={avatarInputRef}
				error={errors.avatarFile}
				onAvatarChange={(e) => {
					setValue('removeAvatar', false);
					handleAvatarChange(e);
				}}
				onRemoveAvatar={handleRemoveAvatarClick}
			/>

			<ProfileFieldsSection control={control} />

			<div className='flex justify-end'>
				<Button type='submit' disabled={isSubmitDisabled}>
					{isSubmitting && <Loader2 className='size-4 mr-2 animate-spin' />}
					{t('save')}
				</Button>
			</div>
		</form>
	);
};
