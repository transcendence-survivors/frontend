import { memo } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Pencil, Reply, X } from 'lucide-react';
import { ChatMessage, ChatMessageType } from '../../../types/message';

interface ChatMessageModeBannerProps {
	editingMessage?: Extract<ChatMessage, { type: ChatMessageType.TEXT }> | null;
	replyingToMessage?: Extract<ChatMessage, { type: ChatMessageType.TEXT }> | null;
	onCancel: () => void;
}

const MAX_PREVIEW_LENGTH = 30;

export const ChatMessageModeBanner = memo(
	({ editingMessage, replyingToMessage, onCancel }: ChatMessageModeBannerProps) => {
		const t = useTranslations('chat.messages.mode');

		if (!editingMessage && !replyingToMessage) return null;

		return (
			<div className='flex items-center justify-between bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground border-b border-border'>
				<div className='flex items-center gap-2 truncate'>
					{editingMessage ? (
						<>
							<Pencil className='size-3.5 text-primary shrink-0' />
							<span>{t('editing')}</span>
						</>
					) : (
						<>
							<Reply className='size-3.5 text-primary shrink-0' />
							<span>
								{t.rich('replying_to', {
									name: replyingToMessage?.sender.displayName ?? '',
									strong: (chunks) => (
										<strong className='text-foreground'>
											{chunks}
										</strong>
									),
								})}
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
