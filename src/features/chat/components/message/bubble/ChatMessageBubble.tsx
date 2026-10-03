import { memo } from 'react';
import {
	ChatMessageType,
	PostChatMessage,
	TextChatMessage,
} from '../../../types/message';
import { AvatarProfileTooltip } from '@/features/user/components/Avatar/AvatarProfile';
import { Skeleton } from '@/components/ui/skeleton';
import { ChatMessageActions } from '../ChatMessageActions';
import { ChatMessageBubbleDeleted } from './ChatMessageBubbleDeleted';
import { ChatMessageBubbleContent } from './ChatMessageBubbleContent';
import DisplayDate from '@/components/ui/date';
import { useUser } from '@/features/auth/stores/session';
import { SharedPostCard } from '@/features/posts/components/card/SharedPostCard';
import { cn } from '@/libs/utils';

interface ChatMessageBubbleProps {
	message: TextChatMessage | PostChatMessage;
	prevUserId?: string;
	isHighlighted?: boolean;
	onEdit: (message: TextChatMessage | PostChatMessage) => void;
	onReply: (message: TextChatMessage | PostChatMessage) => void;
	onDelete: (messageId: string) => void;
}

const ChatMessageBubble = memo(
	({
		message,
		prevUserId,
		isHighlighted,
		onEdit,
		onDelete,
		onReply,
	}: ChatMessageBubbleProps) => {
		const user = useUser();
		const isMe = user?.id === message.sender?.id;
		const showAvatar =
			(!isMe && message.sender?.id !== prevUserId) || !message.sender?.id;

		return (
			<div
				id={`message-${message.id}`}
				className={cn(
					'group flex items-center gap-2 px-4 py-2 hover:bg-muted focus-within:bg-muted',
					isHighlighted &&
						'bg-primary/20 hover:bg-primary/30 focus-within:bg-primary/30',
					isMe ? 'flex-row-reverse' : 'flex-row',
				)}>
				{showAvatar && <AvatarProfileTooltip user={message.sender} size='sm' />}

				<div
					className={`
                        relative flex max-w-[75%] min-w-0 flex-col 
                        ${isMe ? 'items-end' : 'items-start'} 
                        ${!isMe && !showAvatar ? 'ml-10' : ''}`}>
					{message.isDeleted ? (
						<ChatMessageBubbleDeleted />
					) : (
						<>
							<ChatMessageBubbleContent
								message={message}
								isMe={isMe}
								className={
									isMe
										? 'bg-primary text-primary-foreground rounded-br-xs group-hover:bg-chart-2 focus-within:bg-chart-2'
										: 'bg-card border border-border text-card-foreground rounded-bl-xs group-hover:bg-muted focus-within:bg-muted'
								}>
								{message.type === ChatMessageType.POST_SHARE && (
									<SharedPostCard post={message.sharedPost} />
								)}
							</ChatMessageBubbleContent>
							<ChatMessageActions
								message={message}
								isMe={isMe}
								onEdit={onEdit}
								onDelete={onDelete}
								onReply={onReply}
							/>
						</>
					)}
				</div>

				<div className='mt-1 flex items-center gap-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
					<DisplayDate
						date={new Date(message.createdAt)}
						formatOptions={{
							hour: '2-digit',
							minute: '2-digit',
						}}
					/>
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
