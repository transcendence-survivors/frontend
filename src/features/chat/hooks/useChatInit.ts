import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMessageActions } from '../stores/messageSlice';
import { useSocketState } from '@/modules/websocket/hooks/useSocketState';
import { useTypingActions } from '../stores/typingSlice';

export function useChatInit() {
	const queryClient = useQueryClient();
	const { socket, isConnected } = useSocketState();
	const { initMessageListeners, destroyMessageListeners } = useMessageActions();
	const { initTypingListeners, destroyTypingListeners } = useTypingActions();

	useEffect(() => {
		if (!socket || !isConnected) return;
		initMessageListeners(queryClient);
		initTypingListeners();
		return () => {
			destroyMessageListeners();
			destroyTypingListeners();
		};
	}, [
		socket,
		isConnected,
		queryClient,
		initMessageListeners,
		destroyMessageListeners,
		initTypingListeners,
		destroyTypingListeners,
	]);
}
