import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { useEffect } from 'react';
import { useRoomActions } from '../../stores/roomSlice';
import { ChatRoom } from '../../types/room';
import { ChatMemberRole } from '../../types/member';
import { useUser } from '@/features/auth/stores/session';
import { useNotificationActions } from '../../stores/notificationSlice';
import { useQueryClient } from '@tanstack/react-query';

export const useJoinChatRoom = (room: ChatRoom, role: ChatMemberRole) => {
	const queryClient = useQueryClient();
	const socket = useWebsocketStore((s) => s.socket);
	const roomActions = useRoomActions();
	const notifActions = useNotificationActions();
	const user = useUser();

	const roomId = room.id;
	const userId = user?.id || null;

	useEffect(() => {
		if (roomId) roomActions.setRoom(room);
	}, [room, roomId, roomActions]);

	useEffect(() => {
		if (!roomId) return;

		roomActions.setRoomRole(role);
		roomActions.setUserId(userId);
		notifActions.setCurrentRoomId(roomId);

		if (socket) {
			void notifActions.markRoomAsRead(roomId, queryClient);
			void roomActions.joinRoom(roomId);
		}

		return () => {
			if (socket) {
				void roomActions.leaveRoom(roomId);
			}
			roomActions.clearRoomState();
			notifActions.setCurrentRoomId(null);
		};
	}, [socket, roomId, role, userId, roomActions, notifActions, queryClient]);
};
