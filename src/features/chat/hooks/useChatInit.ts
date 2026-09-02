// modules/chat/hooks/use-chat-init.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useChatActions } from '../stores/chatSlice';
import { useSocketState } from '@/modules/websocket/hooks/useSocketState';

export function useChatInit() {
	const queryClient = useQueryClient();
	const { socket, isConnected } = useSocketState();
	const { initChatListeners, destroyChatListeners } = useChatActions();

	useEffect(() => {
		if (!socket || !isConnected) return;
		initChatListeners(queryClient);
		return () => {
			destroyChatListeners();
		};
	}, [socket, isConnected, queryClient, initChatListeners, destroyChatListeners]);
}
