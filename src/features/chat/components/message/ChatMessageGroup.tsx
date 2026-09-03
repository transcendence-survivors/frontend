import React from 'react';
import { ChatDateDivider } from './ChatDateDivider';
import { ChatMessageBubble } from './ChatMessageBubble';
import { ChatMessage } from '../../types/message';

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
					const prevMessage = dayMessages[index - 1];
					const isMe = currentUserId === message.sender.id;
					return (
						<li key={message.id}>
							<ChatMessageBubble
								message={message}
								isMe={isMe}
								prevUserId={prevMessage?.sender?.id}
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
