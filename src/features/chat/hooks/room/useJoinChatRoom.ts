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
	const userId = user?.id || null;

	useEffect(() => {
		roomActions.setRoom(room);
		roomActions.setRoomRole(role);
		roomActions.setUserId(userId);
		notifActions.setCurrentRoomId(room.id);

		if (socket) {
			void notifActions.markRoomAsRead(room.id, queryClient);
			void roomActions.joinRoom(room.id);
		}

		return () => {
			if (socket) {
				void roomActions.leaveRoom(room.id);
			}
			roomActions.clearRoomState();
			notifActions.setCurrentRoomId(null);
		};
	}, [socket, room, role, userId, roomActions, notifActions, queryClient]);
};
