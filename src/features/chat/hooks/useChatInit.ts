import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSocketState } from '@/modules/websocket/hooks/useSocketState';
import { useMessageActions } from '../stores/messageSlice';
import { useTypingActions } from '../stores/typingSlice';
import { useRoomActions } from '../stores/roomSlice';
import { useNotificationActions } from '../stores/notificationSlice';

export function useChatInit() {
	const queryClient = useQueryClient();
	const { socket, isConnected } = useSocketState();

	const messageActions = useMessageActions();
	const typingActions = useTypingActions();
	const roomActions = useRoomActions();
	const notifActions = useNotificationActions();

	useEffect(() => {
		if (!socket || !isConnected) return;

		messageActions.initMessageListeners(queryClient);
		typingActions.initTypingListeners();
		roomActions.initRoomListeners(queryClient);
		notifActions.initNotificationListeners(queryClient);

		return () => {
			messageActions.destroyMessageListeners();
			typingActions.destroyTypingListeners();
			roomActions.destroyRoomListeners();
			notifActions.destroyNotificationListeners();
		};
	}, [
		socket,
		isConnected,
		queryClient,
		messageActions,
		typingActions,
		roomActions,
		notifActions,
	]);
}
