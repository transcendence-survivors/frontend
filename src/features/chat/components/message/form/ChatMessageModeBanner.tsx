import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Reply, X } from 'lucide-react';
import { PostChatMessage, TextChatMessage } from '../../../types/message';
import { useTranslations } from 'next-intl';

interface ChatMessageModeBannerProps {
	editingMessage?: TextChatMessage | PostChatMessage | null;
	replyingToMessage?: TextChatMessage | PostChatMessage | null;
	onCancel: () => void;
}

const MAX_PREVIEW_LENGTH = 30;

export const ChatMessageModeBanner = memo(
	({ editingMessage, replyingToMessage, onCancel }: ChatMessageModeBannerProps) => {
		const t = useTranslations('chat.messages.actions');

		if (!editingMessage && !replyingToMessage) return null;

		return (
			<div className='flex items-center justify-between bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground border-b border-border'>
				<div className='flex items-center gap-2 truncate'>
					{editingMessage ? (
						<>
							<Pencil className='size-3.5 text-primary shrink-0' />
							<span>{t('edditing')}</span>
						</>
					) : (
						<>
							<Reply className='size-3.5 text-primary shrink-0' />
							<span>
								{t.rich('rich_replying_to', {
									strong: () => (
										<strong className='font-semibold'>
											{replyingToMessage?.sender.displayName}
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
