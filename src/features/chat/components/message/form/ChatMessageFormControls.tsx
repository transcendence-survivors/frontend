import { Paperclip, Smile } from 'lucide-react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTranslations } from 'next-intl';
import { bucketsConfig } from '@/libs/api/helpers/attachments';

interface ChatMessageFormControlsProps {
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	attachmentsCount: number;
	isEditing: boolean;
	isEmojiOpen: boolean;
	setIsEmojiOpen: (open: boolean) => void;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onEmojiSelect: (emojiData: EmojiClickData, event: MouseEvent) => void;
}

export const ChatMessageFormControls = ({
	fileInputRef,
	attachmentsCount,
	isEditing,
	isEmojiOpen,
	setIsEmojiOpen,
	onFileChange,
	onEmojiSelect,
}: ChatMessageFormControlsProps) => {
	const t = useTranslations('chat.messages.actions');

	return (
		<div className='flex items-center gap-1'>
			<Button
				type='button'
				variant='ghost'
				size='icon'
				disabled={
					attachmentsCount >= bucketsConfig.chat.maxFilesCount || isEditing
				}
				aria-label={t('attach_images_videos')}
				onClick={() => fileInputRef.current?.click()}
				className='text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50'>
				<Paperclip className='size-4' aria-hidden='true' />
			</Button>

			<input
				ref={fileInputRef}
				type='file'
				multiple
				accept={bucketsConfig.chat.mimes.join(',')}
				tabIndex={-1}
				className='sr-only'
				aria-label={t('attach_images_videos')}
				onChange={onFileChange}
			/>

			<Popover open={isEmojiOpen} onOpenChange={setIsEmojiOpen}>
				<PopoverTrigger asChild>
					<Button
						type='button'
						variant='ghost'
						size='icon'
						aria-label={t('choose_emoji')}
						className='text-muted-foreground hover:bg-muted hover:text-foreground'>
						<Smile className='size-4' aria-hidden='true' />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					side='top'
					align='start'
					onOpenAutoFocus={(e) => e.preventDefault()}
					onCloseAutoFocus={(e) => e.preventDefault()}
					className='w-auto p-0 border-none shadow-none bg-transparent'>
					<EmojiPicker
						onEmojiClick={onEmojiSelect}
						theme={Theme.AUTO}
						className='max-w-3/4'
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};
