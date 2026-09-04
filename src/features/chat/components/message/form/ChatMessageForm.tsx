'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Send } from 'lucide-react';
import { EmojiClickData } from 'emoji-picker-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import FormField from '@/modules/forms/components/Base/FormField';
import { MediaAttachmentPreviews } from '@/components/ui/media-attachment-previews';

import { useSendMessage, useEditMessage } from '../../../hooks/useMessageActions';
import { ChatMessage } from '../../../types/message';
import { ChatMessageModeBanner } from './ChatMessageModeBanner';
import { ChatTypingIndicator } from '../../ChatTypingIndicator';

import {
	chatMessageSchema,
	ChatMessageFormValues,
} from '../../../schemas/message.schema';
import { useChatFormTyping } from '../../../hooks/useChatFormTyping';
import { useFileAttachments } from '../../../../../modules/forms/hooks/useFileAttachments';
import { ChatMessageFormControls } from './ChatMessageFormControls';

interface ChatMessageFormProps extends React.HTMLAttributes<HTMLFormElement> {
	roomId: string;
	onCancelMode: () => void;
	editingMessage?: ChatMessage | null;
	replyingToMessage?: ChatMessage | null;
}

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

	const cursorRef = useRef({ start: 0, end: 0 });
	const [isEmojiOpen, setIsEmojiOpen] = useState(false);

	const {
		handleSubmit,
		setValue,
		getValues,
		control,
		reset,
		clearErrors,
		setFocus,
		formState: { errors, isDirty, isSubmitting },
	} = useForm<ChatMessageFormValues>({
		resolver: zodResolver(chatMessageSchema),
		defaultValues: { text: '', attachments: [] },
	});

	const textValue = useWatch({ control, name: 'text' });
	const attachments =
		useWatch({ control, name: 'attachments', defaultValue: EMPTY_ATTACHMENTS }) ??
		EMPTY_ATTACHMENTS;

	const { stopTyping } = useChatFormTyping({
		roomId,
		textValue,
		attachments,
		isEditing: !!editingMessage,
	});

	const { fileInputRef, previews, handleFileChange, handleRemoveAttachment } =
		useFileAttachments({
			attachments,
			setValue,
			fieldName: 'attachments',
			maxFiles: 5,
		});

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

	const handleSaveCursorPosition = useCallback((e: React.SyntheticEvent) => {
		const target = e.target as HTMLTextAreaElement;
		if (target && target.tagName === 'TEXTAREA') {
			cursorRef.current = {
				start: target.selectionStart,
				end: target.selectionEnd,
			};
		}
	}, []);

	const handleEmojiSelect = useCallback(
		(emojiData: EmojiClickData, event: MouseEvent) => {
			const currentText = getValues('text') || '';
			const { start, end } = cursorRef.current;
			const updatedText =
				currentText.slice(0, start) + emojiData.emoji + currentText.slice(end);

			setValue('text', updatedText, { shouldValidate: true, shouldDirty: true });
			const newPos = start + emojiData.emoji.length;
			cursorRef.current = { start: newPos, end: newPos };

			if (!event.shiftKey) {
				setIsEmojiOpen(false);
				setFocus('text');
				setTimeout(() => {
					const activeEl = document.activeElement as HTMLTextAreaElement | null;
					if (activeEl && activeEl.tagName === 'TEXTAREA') {
						activeEl.setSelectionRange(newPos, newPos);
					}
				}, 0);
			}
		},
		[getValues, setValue, setFocus],
	);

	const submit = async (data: ChatMessageFormValues) => {
		if (!roomId) return;

		stopTyping();

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
	const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
		const target = e.target as HTMLElement;
		if (target.tagName === 'TEXTAREA') {
			handleSaveCursorPosition(e);
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault();
				if (!isSubmitDisabled) {
					handleSubmit(submit)();
				}
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit(submit)}
			onKeyDown={handleFormKeyDown}
			onKeyUp={handleSaveCursorPosition}
			onClick={handleSaveCursorPosition}
			onBlur={handleSaveCursorPosition}
			className={cn('px-3 bg-card border-t border-border flex flex-col', className)}
			{...props}>
			<ChatMessageModeBanner
				editingMessage={editingMessage}
				replyingToMessage={replyingToMessage}
				onCancel={onCancelMode}
			/>
			<ChatTypingIndicator roomId={roomId} className='pt-2 -mb-1' />
			<MediaAttachmentPreviews
				previews={previews}
				onRemove={handleRemoveAttachment}
			/>

			<div className='py-3 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2'>
				<ChatMessageFormControls
					fileInputRef={fileInputRef}
					attachmentsCount={attachments.length}
					isEditing={!!editingMessage}
					isEmojiOpen={isEmojiOpen}
					setIsEmojiOpen={setIsEmojiOpen}
					onFileChange={handleFileChange}
					onEmojiSelect={handleEmojiSelect}
				/>

				<FormField
					control={control}
					field={{
						component: 'textarea',
						name: 'text',
						placeholder: editingMessage
							? 'Edit message…'
							: 'Send a message into the dark…',
						label: { text: 'Message', srOnly: true },
						required: false,
						hideError: true,
						className:
							'resize-none min-h-8 max-h-[min(12rem,50vh)] overflow-y-auto',
					}}
				/>

				<div className='flex items-center gap-1 h-full'>
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
