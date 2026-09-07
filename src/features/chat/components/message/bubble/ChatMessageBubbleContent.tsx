import { HTMLAttributes, memo } from 'react';
import { cn } from '@/libs/utils';
import { ChatMessage } from '../../../types/message';
import { ChatMessageReplyPreview } from '../ChatMessageReplyPreview';
import { ChatMessageBubbleAttachments } from './ChatMessageBubbleAttachments';

export interface ChatMessageContentProps extends HTMLAttributes<HTMLDivElement> {
	message: ChatMessage;
	isMe?: boolean;
	showReplyPreview?: boolean;
}

export const ChatMessageBubbleContent = memo(
	({
		message,
		isMe = false,
		showReplyPreview = true,
		className,
		...props
	}: ChatMessageContentProps) => {
		return (
			<div
				className={cn(
					'relative min-w-0 max-w-full rounded-2xl px-4 py-2 text-sm shadow-sm transition-colors',
					className,
				)}
				{...props}>
				{showReplyPreview && message.replyToId && (
					<ChatMessageReplyPreview replyToId={message.replyToId} isMe={isMe} />
				)}

				{message.content && (
					<p className='min-w-0 max-w-full whitespace-pre-wrap break-all leading-relaxed'>
						{message.content}
					</p>
				)}

				{message.attachmentUrls && message.attachmentUrls.length > 0 && (
					<ChatMessageBubbleAttachments
						attachmentUrls={message.attachmentUrls}
					/>
				)}
			</div>
		);
	},
);
ChatMessageBubbleContent.displayName = 'ChatMessageContent';
