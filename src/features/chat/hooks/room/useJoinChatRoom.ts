import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { useEffect } from 'react';
import { useRoomActions } from '../../stores/roomSlice';
import { ChatRoom } from '../../types/room';
import { ChatMemberRole } from '../../types/member';
import { useUser } from '@/features/auth/stores/session';

export const useJoinChatRoom = (room: ChatRoom, role: ChatMemberRole) => {
	const socket = useWebsocketStore((s) => s.socket);
	const actions = useRoomActions();
	const user = useUser();

	useEffect(() => {
		actions.setRoom(room);
		actions.setRoomRole(role);
		actions.setUserId(user?.id || null);

		if (socket && room.id) actions.joinRoom(room.id);

		return () => {
			if (socket && room.id) actions.leaveRoom(room.id);
			actions.clearRoomState();
		};
	}, [socket, room, role, actions, user]);
};
