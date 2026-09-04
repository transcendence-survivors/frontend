import { Paperclip, Smile } from 'lucide-react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MAX_FILES_COUNT } from '../../../schemas/message.schema';

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
	return (
		<div className='flex items-center gap-1'>
			<Button
				type='button'
				variant='ghost'
				size='icon'
				disabled={attachmentsCount >= MAX_FILES_COUNT || isEditing}
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
				onChange={onFileChange}
			/>

			<Popover open={isEmojiOpen} onOpenChange={setIsEmojiOpen}>
				<PopoverTrigger asChild>
					<Button
						type='button'
						variant='ghost'
						size='icon'
						aria-label='Choose emoji'
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
					<EmojiPicker onEmojiClick={onEmojiSelect} theme={Theme.AUTO} />
				</PopoverContent>
			</Popover>
		</div>
	);
};
