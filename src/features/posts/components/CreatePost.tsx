'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useForm, useWatch, FieldError as RHFFieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';
import { EmojiClickData } from 'emoji-picker-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldError } from '@/components/ui/field';
import { FormFieldParams } from '@/modules/forms/types/FormFieldParams';
import { MediaAttachmentPreviews } from '@/components/ui/media-attachment-previews';
import { useFileAttachments } from '@/modules/forms/hooks/useFileAttachments';
import { translateError } from '@/modules/forms/utils/translate/errors';
import { cn } from '@/libs/utils';

import { useCreatePost } from '../hook/useCreatePost';
import { CreatePostFormValues, createPostSchema } from '../schemas/createPost.schema';
import FormField from '@/modules/forms/components/Base/FormField';
import { CreatePostControls } from './CreatePostControls';

interface CreatePostProps {
	parentPostId?: string;
	quotedPostId?: string;
	onSuccess?: () => void;
	className?: string;
}

export default function CreatePost({
	parentPostId,
	quotedPostId,
	onSuccess,
	className,
}: CreatePostProps) {
	const rootT = useTranslations();
	const t = useTranslations('posts.create');
	const createPost = useCreatePost(parentPostId, quotedPostId);

	const cursorRef = useRef({ start: 0, end: 0 });
	const [isEmojiOpen, setIsEmojiOpen] = useState(false);

	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		setFocus,
		trigger,
		clearErrors,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CreatePostFormValues>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			content: '',
			file: undefined,
		},
		mode: 'onChange',
	});

	const content = useWatch({ control, name: 'content', defaultValue: '' }) ?? '';
	const file = useWatch({ control, name: 'file' });

	const {
		fileInputRef,
		previews,
		handleFileChange,
		handleRemoveAttachment,
		handleClearAttachments,
	} = useFileAttachments({
		attachments: file,
		setValue,
		fieldName: 'file',
		maxFiles: 1,
	});

	useEffect(() => {
		if (file) {
			clearErrors('content');
			trigger();
		}
	}, [file, trigger, clearErrors]);

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
			const currentText = getValues('content') || '';
			const { start, end } = cursorRef.current;
			const updatedText =
				currentText.slice(0, start) + emojiData.emoji + currentText.slice(end);

			setValue('content', updatedText, { shouldValidate: true, shouldDirty: true });
			const newPos = start + emojiData.emoji.length;
			cursorRef.current = { start: newPos, end: newPos };

			if (!event.shiftKey) {
				setIsEmojiOpen(false);
				setFocus('content');
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

	const contentFieldConfig: FormFieldParams<CreatePostFormValues> = {
		name: 'content',
		component: 'textarea',
		placeholder: t('placeholder'),
		label: {
			text: t('placeholder'),
			srOnly: true,
		},
		addon: {
			type: 'length',
			maxLength: 280,
		},
		hideError: true,
	};

	const submit = (data: CreatePostFormValues) => {
		createPost.mutate(
			{
				content: data.content?.trim() || undefined,
				file: data.file,
			},
			{
				onSuccess: () => {
					reset({ content: '', file: undefined });
					handleClearAttachments();
					onSuccess?.();
				},
			},
		);
	};

	const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
		const target = e.target as HTMLElement;
		if (target.tagName === 'TEXTAREA') {
			handleSaveCursorPosition(e);
			if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				handleSubmit(submit)();
			}
		}
	};

	const isSubmitDisabled =
		isSubmitting ||
		createPost.isPending ||
		(!content.trim() && !file && !quotedPostId);

	const errorField = (errors.content || errors.file) as RHFFieldError | undefined;

	return (
		<form
			onSubmit={handleSubmit(submit)}
			onKeyDown={handleFormKeyDown}
			onKeyUp={handleSaveCursorPosition}
			onClick={handleSaveCursorPosition}
			onBlur={handleSaveCursorPosition}
			className={cn('py-4 transition-all focus-within:border-ring/50', className)}>
			{/* Desktop Side-by-Side / Mobile Stacked Container */}
			<div className='flex flex-col md:flex-row md:items-start gap-4'>
				<div className='flex-1 min-w-0'>
					<FormField field={contentFieldConfig} control={control} />
				</div>

				<Input
					ref={fileInputRef}
					type='file'
					accept='image/*'
					onChange={handleFileChange}
					className='hidden'
				/>

				{previews.length > 0 && (
					<div className='shrink-0 self-start'>
						<MediaAttachmentPreviews
							previews={previews}
							onRemove={handleRemoveAttachment}
							className='py-0'
							itemClassName='size-24 rounded-lg'
						/>
					</div>
				)}
			</div>

			<div className='mt-3 flex items-center justify-between'>
				<CreatePostControls
					fileInputRef={fileInputRef}
					isEmojiOpen={isEmojiOpen}
					setIsEmojiOpen={setIsEmojiOpen}
					onEmojiSelect={handleEmojiSelect}
					isDisabled={isSubmitting || createPost.isPending}
				/>

				<Button
					type='submit'
					disabled={isSubmitDisabled}
					className='gap-2 px-5 font-semibold shadow-sm'>
					<Send className='size-4' />
					<span>{t('submit')}</span>
				</Button>
			</div>

			{errorField && (
				<FieldError
					className='pt-2 text-center text-xs'
					errors={[translateError(rootT, errorField)]}
				/>
			)}
		</form>
	);
}
