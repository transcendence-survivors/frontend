import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { useEffect } from 'react';
import { useRoomActions } from '../../stores/roomSlice';
import { ChatRoom } from '../../types/room';
import { ChatMemberRole } from '../../types/member';

export const useJoinChatRoom = (room: ChatRoom, role: ChatMemberRole) => {
	const socket = useWebsocketStore((s) => s.socket);
	const { joinRoom, leaveRoom, setRoom, setRoomRole, clearRoomState } =
		useRoomActions();

	useEffect(() => {
		setRoom(room);
		setRoomRole(role);
		if (socket && room.id) joinRoom(room.id);

		return () => {
			if (socket && room.id) leaveRoom(room.id);
			clearRoomState();
		};
	}, [socket, room, role, joinRoom, leaveRoom, setRoom, setRoomRole, clearRoomState]);
};
