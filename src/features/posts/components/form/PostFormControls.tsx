'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ImageIcon, Smile } from 'lucide-react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { useTranslations } from 'next-intl';

interface PostFormControlsProps {
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	isEmojiOpen: boolean;
	setIsEmojiOpen: (open: boolean) => void;
	onEmojiSelect: (emojiData: EmojiClickData, event: MouseEvent) => void;
	isDisabled?: boolean;
}

export const PostFormControls = ({
	fileInputRef,
	isEmojiOpen,
	setIsEmojiOpen,
	onEmojiSelect,
	isDisabled = false,
}: PostFormControlsProps) => {
	const t = useTranslations('posts.create');

	return (
		<div className='flex items-center gap-1'>
			<Button
				type='button'
				variant='ghost'
				size='icon'
				className=' text-muted-foreground hover:text-foreground'
				aria-label={t('add_image')}
				onClick={() => fileInputRef.current?.click()}
				disabled={isDisabled}>
				<ImageIcon className='size-5' />
			</Button>

			<Popover open={isEmojiOpen} onOpenChange={setIsEmojiOpen}>
				<PopoverTrigger asChild>
					<Button
						type='button'
						variant='ghost'
						size='icon'
						className=' text-muted-foreground hover:text-foreground'
						aria-label='Add emoji'
						disabled={isDisabled}>
						<Smile className='size-5' />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					side='top'
					align='start'
					className='w-full p-0 border-none bg-transparent shadow-none'>
					<EmojiPicker
						theme={Theme.AUTO}
						onEmojiClick={onEmojiSelect}
						lazyLoadEmojis
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};
