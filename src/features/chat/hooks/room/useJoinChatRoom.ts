import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { useEffect } from 'react';
import { useMessageActions } from '../../stores/messageSlice';

export function useJoinChatRoom(roomId: string) {
	const { joinRoom, leaveRoom } = useMessageActions();
	const socket = useWebsocketStore((s) => s.socket);

	useEffect(() => {
		if (!socket || !roomId) return;

		joinRoom(roomId).catch((err) => console.error('Failed to join room', err));
		return () => {
			leaveRoom(roomId).catch(() => {
				console.error('Failed to leave room', roomId);
			});
		};
	}, [socket, roomId, joinRoom, leaveRoom]);
}
