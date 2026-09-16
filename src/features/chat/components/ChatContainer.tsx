'use client';

import { useState, useCallback } from 'react';
import ChatMessageForm from './message/form/ChatMessageForm';
import { TextChatMessage } from '../types/message';
import ChatMessages from './message/ChatMessages';
import { useJoinChatRoom } from '../hooks/room/useJoinChatRoom';
import { useUser } from '@/features/auth/stores/session';
import { useSoftDeleteMessage } from '../hooks/message/useMessageActions';
import { ChatMemberRole } from '../types/member';
import { ChatRoomType } from '../types/room';

interface ChatContainerProps {
	roomId: string;
	roomType: ChatRoomType;
	role: ChatMemberRole;
}

interface ChatContainerState {
	editingMessage: TextChatMessage | null;
	replyingToMessage: TextChatMessage | null;
}

export const ChatContainer = ({ roomId, roomType, role }: ChatContainerProps) => {
	useJoinChatRoom(roomId);
	const user = useUser();
	const { mutateAsync: softDeleteMessage } = useSoftDeleteMessage();

	const [actionState, setActionState] = useState<ChatContainerState>({
		editingMessage: null,
		replyingToMessage: null,
	});

	const handleEditMessage = useCallback((message: TextChatMessage) => {
		setActionState({ editingMessage: message, replyingToMessage: null });
	}, []);

	const handleReplyMessage = useCallback((message: TextChatMessage) => {
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
		<section className='flex flex-col min-w-0 w-full'>
			<ChatMessages
				userId={user?.id ?? ''}
				role={role}
				roomId={roomId}
				isGroup={roomType === ChatRoomType.GROUP}
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
		</section>
	);
};

export default ChatContainer;
