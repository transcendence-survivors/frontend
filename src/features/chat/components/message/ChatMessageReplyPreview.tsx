import { Reply } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMessageActions } from '../../stores/messageSlice';
import { Button } from '@/components/ui/button';
import { useCurrentRoomId } from '../../stores/chatNotificationSlice';
import { MouseEvent } from 'react';

interface ChatMessageReplyPreviewProps {
	replyToId: string;
	isMe: boolean;
}

export const ChatMessageReplyPreview = ({
	replyToId,
	isMe,
}: ChatMessageReplyPreviewProps) => {
	const t = useTranslations('chat.messages.preview');
	const { jumpToMessage } = useMessageActions();
	const roomId = useCurrentRoomId();

	const handleClick = (e: MouseEvent) => {
		e.preventDefault();
		if (!roomId) return;
		jumpToMessage(replyToId, roomId);
	};

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
						<Button
							variant='link'
							size='sm'
							onClick={handleClick}
							className='p-0 h-auto'>
							#{replyToId.slice(-4)}
						</Button>
					),
				})}
			</span>
		</div>
	);
};
