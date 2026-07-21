'use client';

import { Button } from '@/components/ui/button';
import { MediaModal } from '@/components/ui/media-modal';
import { cn } from '@/libs/utils';
import FormField from '@/modules/forms/components/Base/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Paperclip, Send, X } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import z from 'zod';

interface ChatMessageFormProps extends React.HTMLAttributes<HTMLFormElement> {
	roomId?: string;
}

const ACCEPTED_MEDIA_TYPES = ['image/', 'video/'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILES_COUNT = 5;

const schema = z
	.object({
		text: z.string().trim(),
		attachments: z
			.array(
				z.custom<File>((val) => val instanceof File, { message: 'Invalid file' }),
			)
			.max(MAX_FILES_COUNT, `You can attach up to ${MAX_FILES_COUNT} files`)
			.refine(
				(files) => files.every((file) => file.size <= MAX_FILE_SIZE),
				'Each file must be under 50MB',
			)
			.refine(
				(files) =>
					files.every((file) =>
						ACCEPTED_MEDIA_TYPES.some((type) => file.type.startsWith(type)),
					),
				'Only images and videos are supported',
			)
			.optional(),
	})
	.refine(
		(data) =>
			data.text.length > 0 || (data.attachments && data.attachments.length > 0),
		{
			message: 'Message cannot be empty unless an attachment is provided',
			path: ['text'],
		},
	);

type ChatMessageFormValues = z.infer<typeof schema>;

const EMPTY_ATTACHMENTS: File[] = [];

export const ChatMessageForm = ({ className, ...props }: ChatMessageFormProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		handleSubmit,
		setValue,
		control,
		reset,
		formState: { errors, isDirty, isSubmitting },
	} = useForm<ChatMessageFormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			text: '',
			attachments: [],
		},
	});

	const attachments =
		useWatch<ChatMessageFormValues, 'attachments'>({
			control,
			name: 'attachments',
			defaultValue: EMPTY_ATTACHMENTS,
		}) ?? EMPTY_ATTACHMENTS;

	const previews = useMemo(() => {
		return attachments.map((file) => ({
			file,
			url: URL.createObjectURL(file),
			type: file.type.startsWith('video/')
				? ('video' as const)
				: ('image' as const),
		}));
	}, [attachments]);

	useEffect(() => {
		return () => {
			previews.forEach((preview) => URL.revokeObjectURL(preview.url));
		};
	}, [previews]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(e.target.files || []);
		if (selectedFiles.length === 0) return;

		const updatedFiles = [...attachments, ...selectedFiles].slice(0, MAX_FILES_COUNT);
		setValue('attachments', updatedFiles, { shouldValidate: true });

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const removeAttachment = (indexToRemove: number) => {
		const updatedFiles = attachments.filter((_, index) => index !== indexToRemove);
		setValue('attachments', updatedFiles, { shouldValidate: true });
	};

	const submit = (data: ChatMessageFormValues) => {
		console.log('Submitting message:', data);
		reset();
	};

	const isSubmitDisabled = isSubmitting || (!isDirty && attachments.length === 0);

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className={cn('px-3 bg-card border-t border-border', className)}
			{...props}>
			{previews.length > 0 && (
				<div
					aria-live='polite'
					className='flex flex-wrap gap-2 border-b border-border py-3'>
					{previews.map(({ file, url, type }, index) => (
						<div
							key={`${file.name}-${file.lastModified}-${index}`}
							className='group relative size-20 overflow-hidden rounded-md border border-border bg-muted'>
							<MediaModal
								src={url}
								alt={file.name}
								type={type}
								thumbnailClassName='size-full rounded-none'
								modalClassName='min-w-[300px] min-h-[300px] max-h-[85vh]'
							/>

							<Button
								type='button'
								variant='destructive'
								size='icon'
								className='absolute right-1 top-1 z-20 size-5 rounded-full p-0 shadow-sm'
								onClick={() => removeAttachment(index)}
								aria-label={`Remove ${file.name}`}>
								<X className='size-3' aria-hidden='true' />
							</Button>
						</div>
					))}
				</div>
			)}

			<div className='py-3 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2'>
				<div>
					<Button
						type='button'
						variant='ghost'
						size='icon'
						disabled={attachments.length >= MAX_FILES_COUNT}
						aria-label='Attach images or videos'
						onClick={() => fileInputRef.current?.click()}
						className='text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50'>
						<Paperclip className='size-4' aria-hidden='true' />
					</Button>

					<input
						ref={fileInputRef}
						type='file'
						multiple
						accept='image/*,video/*'
						tabIndex={-1}
						className='sr-only'
						aria-label='Attach images or videos'
						onChange={handleFileChange}
					/>
				</div>

				<FormField
					control={control}
					field={{
						component: 'input',
						name: 'text',
						placeholder: 'Send a message into the dark…',
						label: {
							text: 'Message',
							srOnly: true,
						},
						required: false,
						hideError: true,
					}}
				/>

				<Button
					size='sm'
					type='submit'
					disabled={isSubmitDisabled}
					className='h-full px-4 text-sm'>
					<Send className='size-3.5 mr-1.5' aria-hidden='true' />
					Send
				</Button>
			</div>
			{(errors.attachments || errors.text) && (
				<p role='alert' className='pb-2 text-center text-[11px] text-destructive'>
					{errors.attachments?.message || errors.text?.message}
				</p>
			)}
		</form>
	);
};

export default ChatMessageForm;
