import { memo } from 'react';
import { ChatMessage } from '../../types/message';
import { AvatarProfileTooltip } from '@/features/user/components/Avatar/AvatarProfile';
import { Skeleton } from '@/components/ui/skeleton';
import { ChatMessageBubbleAttachments } from './ChatMessageBubbleAttachments';
import { ChatMessageActions } from './ChatMessageActions';
import { ChatMessageBubbleDeleted } from './ChatMessageBubbleDeleted';
import { ChatMessageReplyPreview } from './ChatMessageReplyPreview';

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

		const showAvatar = message.sender.id !== prevUserId;
		const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
		console.log(
			'Rendering ChatMessageBubble for message:',
			message.id,
			'isMe:',
			isMe,
			'showAvatar:',
			showAvatar,
		);

		return (
			<div
				className={`group flex gap-2 px-4 py-2 hover:bg-muted focus-within:bg-muted ${
					isMe ? 'flex-row-reverse' : 'flex-row'
				}`}>
				{!isMe &&
					(showAvatar ? (
						<AvatarProfileTooltip user={message.sender} size='sm' />
					) : (
						<div className='size-8' />
					))}

				<div
					className={`relative flex max-w-[75%] flex-col ${isMe ? 'items-end' : 'items-start'}`}>
					<div
						className={`relative rounded-2xl px-4 py-2 text-sm shadow-sm transition-colors ${
							isMe
								? 'bg-primary text-primary-foreground rounded-br-xs'
								: 'bg-card border border-border text-card-foreground rounded-bl-xs'
						}`}>
						{message.replyToId && (
							<ChatMessageReplyPreview
								replyToId={message.replyToId}
								isMe={isMe}
							/>
						)}

						{message.content && (
							<p className='whitespace-pre-wrap wrap-break-words leading-relaxed'>
								{message.content}
							</p>
						)}
						{message.attachmentUrls && message.attachmentUrls.length > 0 && (
							<ChatMessageBubbleAttachments
								attachmentUrls={message.attachmentUrls ?? []}
							/>
						)}
					</div>
					<ChatMessageActions
						message={message}
						isMe={isMe}
						onEdit={onEdit}
						onDelete={onDelete}
						onReply={onReply}
					/>
				</div>

				<span className='mt-1 flex items-center gap-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
					{formattedTime}
					{message.isEdited && <span className='italic'>(edited)</span>}
				</span>
			</div>
		);
	},
);
ChatMessageBubble.displayName = 'ChatMessageBubble';

const ChatMessageBubbleSkeleton = () => (
	<div className='flex  gap-2 px-4 py-2'>
		<Skeleton className='size-8 rounded-full shrink-0' />
		<div className='flex flex-col gap-1 max-w-[75%]'>
			<Skeleton className='h-10 w-[220px] rounded-2xl rounded-bl-xs' />
			<Skeleton className='h-2.5 w-12 rounded' />
		</div>
	</div>
);

export { ChatMessageBubble, ChatMessageBubbleSkeleton };
