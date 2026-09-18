import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMessageActions } from '../stores/messageSlice';
import { useSocketState } from '@/modules/websocket/hooks/useSocketState';
import { useTypingActions } from '../stores/typingSlice';
import { useRoomActions } from '../stores/roomSlice';

export function useChatInit() {
	const queryClient = useQueryClient();
	const { socket, isConnected } = useSocketState();

	const { initMessageListeners, destroyMessageListeners } = useMessageActions();
	const { initTypingListeners, destroyTypingListeners } = useTypingActions();
	const { initRoomListeners, destroyRoomListeners } = useRoomActions();

	useEffect(() => {
		if (!socket || !isConnected) return;

		initMessageListeners(queryClient);
		initTypingListeners();
		initRoomListeners(queryClient);

		return () => {
			destroyMessageListeners();
			destroyTypingListeners();
			destroyRoomListeners();
		};
	}, [
		socket,
		isConnected,
		queryClient,
		initMessageListeners,
		destroyMessageListeners,
		initTypingListeners,
		destroyTypingListeners,
		initRoomListeners,
		destroyRoomListeners,
	]);
}
