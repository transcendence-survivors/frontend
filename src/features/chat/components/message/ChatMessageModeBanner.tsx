import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Reply, X } from 'lucide-react';
import { ChatMessage } from '../../types/message';

interface ChatMessageModeBannerProps {
	editingMessage?: ChatMessage | null;
	replyingToMessage?: ChatMessage | null;
	onCancel: () => void;
}

const MAX_PREVIEW_LENGTH = 30;

export const ChatMessageModeBanner = memo(
	({ editingMessage, replyingToMessage, onCancel }: ChatMessageModeBannerProps) => {
		if (!editingMessage && !replyingToMessage) return null;

		return (
			<div className='flex items-center justify-between bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground border-b border-border'>
				<div className='flex items-center gap-2 truncate'>
					{editingMessage ? (
						<>
							<Pencil className='size-3.5 text-primary shrink-0' />
							<span>Editing message</span>
						</>
					) : (
						<>
							<Reply className='size-3.5 text-primary shrink-0' />
							<span>
								Replying to&nbsp;
								<strong className='text-foreground'>
									{replyingToMessage?.sender.displayName}
								</strong>
								{replyingToMessage?.content && (
									<span className='ml-1 text-muted-foreground'>
										:&nbsp;
										{replyingToMessage.content.slice(
											0,
											MAX_PREVIEW_LENGTH,
										)}
										{replyingToMessage.content.length >
											MAX_PREVIEW_LENGTH && '...'}
									</span>
								)}
							</span>
						</>
					)}
				</div>
				<Button
					type='button'
					variant='ghost'
					size='icon'
					className='size-5 text-muted-foreground hover:text-foreground'
					onClick={onCancel}>
					<X className='size-3.5' />
				</Button>
			</div>
		);
	},
);

ChatMessageModeBanner.displayName = 'ChatMessageModeBanner';
