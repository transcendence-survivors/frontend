'use client';

import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Paperclip, Save, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import FormField from '@/modules/forms/components/Base/FormField';
import { useSendMessage, useEditMessage } from '../../hooks/useMessageActions';
import { ChatMessage } from '../../types/message';

import {
	MediaAttachmentPreviews,
	MediaPreviewItem,
} from '@/components/ui/media-attachment-previews';
import { ChatMessageModeBanner } from './ChatMessageModeBanner';

interface ChatMessageFormProps extends React.HTMLAttributes<HTMLFormElement> {
	roomId: string;
	onCancelMode: () => void;
	editingMessage?: ChatMessage | null;
	replyingToMessage?: ChatMessage | null;
}

const ACCEPTED_MEDIA_TYPES = ['image/', 'video/'];
const MAX_FILE_SIZE = 50 * 1024 * 1024;
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

export const ChatMessageForm = ({
	className,
	roomId,
	onCancelMode,
	editingMessage,
	replyingToMessage,
	...props
}: ChatMessageFormProps) => {
	const { mutateAsync: sendMessage } = useSendMessage();
	const { mutateAsync: editMessage } = useEditMessage();

	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		handleSubmit,
		setValue,
		control,
		reset,
		clearErrors,
		setFocus,
		formState: { errors, isDirty, isSubmitting, isSubmitted },
	} = useForm<ChatMessageFormValues>({
		resolver: zodResolver(schema),
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: { text: '', attachments: [] },
	});

	const attachments =
		useWatch<ChatMessageFormValues, 'attachments'>({
			control,
			name: 'attachments',
			defaultValue: EMPTY_ATTACHMENTS,
		}) ?? EMPTY_ATTACHMENTS;

	const previews: MediaPreviewItem[] = useMemo(() => {
		return attachments.map((file) => ({
			file,
			url: URL.createObjectURL(file),
			type: file.type.startsWith('video/') ? 'video' : 'image',
		}));
	}, [attachments]);

	useEffect(() => {
		clearErrors();

		if (editingMessage) {
			setValue('text', editingMessage.content ?? '', { shouldValidate: true });
			setValue('attachments', [], { shouldValidate: true });
		}
		if (editingMessage || replyingToMessage) {
			setFocus('text');
		}
	}, [editingMessage, replyingToMessage, setValue, clearErrors, setFocus]);

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

	const handleRemoveAttachment = useCallback(
		(indexToRemove: number) => {
			const updatedFiles = attachments.filter(
				(_, index) => index !== indexToRemove,
			);
			setValue('attachments', updatedFiles, { shouldValidate: true });
		},
		[attachments, setValue],
	);

	const submit = async (data: ChatMessageFormValues) => {
		if (!roomId) return;

		if (editingMessage) {
			await editMessage({
				messageId: editingMessage.id,
				content: data.text,
			});
		} else {
			await sendMessage({
				roomId,
				content: data.text,
				files: data.attachments ?? [],
				replyToId: replyingToMessage?.id,
			});
		}

		reset({ text: '', attachments: [] });
		onCancelMode();
	};

	const isSubmitDisabled = isSubmitting || (!isDirty && attachments.length === 0);

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className={cn('px-3 bg-card border-t border-border flex flex-col', className)}
			{...props}>
			<ChatMessageModeBanner
				editingMessage={editingMessage}
				replyingToMessage={replyingToMessage}
				onCancel={onCancelMode}
			/>
			<MediaAttachmentPreviews
				previews={previews}
				onRemove={handleRemoveAttachment}
			/>

			<div className='py-3 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2'>
				<div>
					<Button
						type='button'
						variant='ghost'
						size='icon'
						disabled={
							attachments.length >= MAX_FILES_COUNT || !!editingMessage
						}
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
						placeholder: editingMessage
							? 'Edit message…'
							: 'Send a message into the dark…',
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
					{editingMessage ? (
						<Save className='size-3.5 mr-1.5' />
					) : (
						<Send className='size-3.5 mr-1.5' />
					)}
					{editingMessage ? 'Save' : 'Send'}
				</Button>
			</div>

			{isSubmitted && (errors.attachments || errors.text) && (
				<p role='alert' className='pb-2 text-center text-[11px] text-destructive'>
					{errors.attachments?.message || errors.text?.message}
				</p>
			)}
		</form>
	);
};

export default ChatMessageForm;
