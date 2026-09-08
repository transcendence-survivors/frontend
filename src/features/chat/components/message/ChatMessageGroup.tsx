import React from 'react';
import { ChatDateDivider } from './ChatDateDivider';
import { ChatMessageBubble } from './bubble/ChatMessageBubble';
import { ChatMessage, ChatMessageType } from '../../types/message';
import { ChatMessageSystem } from './bubble/ChatMessageSystem';

interface ChatMessageGroupProps {
	date: string;
	dayMessages: ChatMessage[];
	currentUserId?: string;
	onEdit: (message: ChatMessage) => void;
	onDelete: (messageId: string) => void;
	onReply: (message: ChatMessage) => void;
}

export const ChatMessageGroup = React.memo(
	({
		date,
		dayMessages,
		currentUserId,
		onEdit,
		onDelete,
		onReply,
	}: ChatMessageGroupProps) => (
		<div className='flex flex-col gap-2'>
			<ChatDateDivider date={date} />
			<ul className='flex flex-col'>
				{dayMessages.map((message, index) => {
					if (message.type !== ChatMessageType.TEXT) {
						return (
							<li key={message.id}>
								<ChatMessageSystem message={message} />
							</li>
						);
					}

					const prevMessage = dayMessages[index - 1];
					const isPrevSystemMessage =
						prevMessage?.type !== ChatMessageType.TEXT;
					const prevUserId = isPrevSystemMessage
						? undefined
						: prevMessage?.sender?.id;
					const isMe = currentUserId === message.sender?.id;

					return (
						<li key={message.id}>
							<ChatMessageBubble
								message={message}
								isMe={isMe}
								prevUserId={prevUserId}
								onEdit={isMe ? onEdit : undefined}
								onDelete={isMe ? onDelete : undefined}
								onReply={onReply}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	),
);

ChatMessageGroup.displayName = 'ChatMessageGroup';
