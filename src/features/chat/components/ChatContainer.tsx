'use client';

import { useState, useCallback } from 'react';
import ChatMessageForm from './message/form/ChatMessageForm';
import { ChatMessage } from '../types/message';
import ChatMessages from './message/ChatMessages';
import { useJoinChatRoom } from '../hooks/useJoinChatRoom';
import { useUser } from '@/features/auth/stores/session';
import { useSoftDeleteMessage } from '../hooks/useMessageActions';

interface ChatContainerProps {
	roomId: string;
}

interface ChatContainerState {
	editingMessage: ChatMessage | null;
	replyingToMessage: ChatMessage | null;
}

export const ChatContainer = ({ roomId }: ChatContainerProps) => {
	useJoinChatRoom(roomId);
	const user = useUser();
	const { mutateAsync: softDeleteMessage } = useSoftDeleteMessage();

	const [actionState, setActionState] = useState<ChatContainerState>({
		editingMessage: null,
		replyingToMessage: null,
	});

	const handleEditMessage = useCallback((message: ChatMessage) => {
		setActionState({ editingMessage: message, replyingToMessage: null });
	}, []);

	const handleReplyMessage = useCallback((message: ChatMessage) => {
		setActionState({ editingMessage: null, replyingToMessage: message });
	}, []);

	const handleCancelMode = useCallback(() => {
		setActionState({ editingMessage: null, replyingToMessage: null });
	}, []);

	const handleDeleteMessage = useCallback(
		async (messageId: string) => {
			await softDeleteMessage(messageId);
			setActionState({ editingMessage: null, replyingToMessage: null });
		},
		[softDeleteMessage],
	);

	return (
		<div className='flex flex-col h-full overflow-hidden'>
			<ChatMessages
				userId={user?.id ?? ''}
				roomId={roomId}
				onEditMessage={handleEditMessage}
				onDeleteMessage={handleDeleteMessage}
				onReplyMessage={handleReplyMessage}
			/>
			<ChatMessageForm
				roomId={roomId}
				editingMessage={actionState.editingMessage}
				replyingToMessage={actionState.replyingToMessage}
				onCancelMode={handleCancelMode}
			/>
		</div>
	);
};

export default ChatContainer;
