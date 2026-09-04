import { memo } from 'react';
import { ChatMessage } from '../../../types/message';
import { AvatarProfileTooltip } from '@/features/user/components/Avatar/AvatarProfile';
import { Skeleton } from '@/components/ui/skeleton';
import { ChatMessageActions } from '../ChatMessageActions';
import { ChatMessageBubbleDeleted } from './ChatMessageBubbleDeleted';
import { ChatMessageBubbleContent } from './ChatMessageBubbleContent';

interface ChatMessageBubbleProps {
	message: ChatMessage;
	isMe: boolean;
	prevUserId?: string;
	onEdit?: (message: ChatMessage) => void;
	onDelete?: (messageId: string) => void;
	onReply?: (message: ChatMessage) => void;
}

const ChatMessageBubble = memo(
	({
		message,
		isMe,
		prevUserId,
		onEdit,
		onDelete,
		onReply,
	}: ChatMessageBubbleProps) => {
		if (message.isDeleted) {
			return <ChatMessageBubbleDeleted isMe={isMe} />;
		}

		const showAvatar = !isMe && message.sender.id !== prevUserId;
		const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});

		return (
			<div
				className={`group flex gap-2 px-4 py-2 hover:bg-muted focus-within:bg-muted ${
					isMe ? 'flex-row-reverse' : 'flex-row'
				}`}>
				{showAvatar && <AvatarProfileTooltip user={message.sender} size='sm' />}

				<div
					className={`relative flex max-w-[75%] flex-col 
                    ${isMe ? 'items-end' : 'items-start'} 
                    ${!isMe && !showAvatar ? 'ml-10' : ''}`}>
					<ChatMessageBubbleContent
						message={message}
						isMe={isMe}
						className={
							isMe
								? 'bg-primary text-primary-foreground rounded-br-xs group-hover:bg-chart-2 focus-within:bg-chart-2'
								: 'bg-card border border-border text-card-foreground rounded-bl-xs group-hover:bg-muted focus-within:bg-muted'
						}
					/>
					<ChatMessageActions
						message={message}
						isMe={isMe}
						onEdit={onEdit}
						onDelete={onDelete}
						onReply={onReply}
					/>
				</div>

				<div className='mt-1 flex items-center gap-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
					<span>{formattedTime}</span>
					{message.isEdited && <span className='italic'>(edited)</span>}
				</div>
			</div>
		);
	},
);
ChatMessageBubble.displayName = 'ChatMessageBubble';

const ChatMessageBubbleSkeleton = () => (
	<div className='flex gap-2 px-4 py-2'>
		<Skeleton className='size-8 rounded-full shrink-0' />
		<div className='flex flex-col gap-1 max-w-[75%]'>
			<Skeleton className='h-10 w-[220px] rounded-2xl rounded-bl-xs' />
			<Skeleton className='h-2.5 w-12 rounded' />
		</div>
	</div>
);

export { ChatMessageBubble, ChatMessageBubbleSkeleton };
