import { Reply } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ChatMessageReplyPreviewProps {
	replyToId: string;
	isMe: boolean;
}

export const ChatMessageReplyPreview = ({
	replyToId,
	isMe,
}: ChatMessageReplyPreviewProps) => {
	const t = useTranslations('chat.messages.preview');

	return (
		<div
			className={`mb-1 flex items-center gap-1.5 rounded-md  px-2.5 py-1 text-xs border-l-2 
                ${
					isMe
						? 'rounded-br-none bg-chart-2 text-muted'
						: 'rounded-bl-none bg-muted/60 text-muted-foreground border-primary/70'
				}`}>
			<Reply className='size-3 shrink-0' />
			<span className='truncate max-w-[180px]'>
				{t.rich('replying_to', {
					replyToId: () => (
						<a href={`#${replyToId}`} className='font-mono text-[10px]'>
							#{replyToId.slice(-4)}
						</a>
					),
				})}
				<span className='font-mono text-[10px]'>#{replyToId.slice(-4)}</span>
			</span>
		</div>
	);
};
