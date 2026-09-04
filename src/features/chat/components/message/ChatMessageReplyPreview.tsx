import { Reply } from 'lucide-react';

interface ChatMessageReplyPreviewProps {
	replyToId: string;
	isMe: boolean;
}

export const ChatMessageReplyPreview = ({
	replyToId,
	isMe,
}: ChatMessageReplyPreviewProps) => {
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
				Replying to message&nbsp;
				<span className='font-mono text-[10px]'>#{replyToId.slice(-4)}</span>
			</span>
		</div>
	);
};
