import React from 'react';
import { ChatDateDivider } from './ChatDateDivider';
import { ChatMessageBubble } from './bubble/ChatMessageBubble';
import { ChatMessage, ChatMessageType, TextChatMessage } from '../../types/message';
import { ChatMessageSystem } from './bubble/ChatMessageSystem';

interface ChatMessageGroupProps {
	date: string;
	dayMessages: ChatMessage[];
	onEdit: (message: TextChatMessage) => void;
	onDelete: (messageId: string) => void;
	onReply: (message: TextChatMessage) => void;
}

export const ChatMessageGroup = React.memo(
	({ date, dayMessages, onEdit, onDelete, onReply }: ChatMessageGroupProps) => (
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

					return (
						<li key={message.id}>
							<ChatMessageBubble
								message={message}
								prevUserId={prevUserId}
								onEdit={onEdit}
								onDelete={onDelete}
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
