import { ChatRoom, ChatRoomType, DirectChatRoom } from '../types';
import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { PresenceStatus } from '@/features/presence/types/status';
import { statusPriority } from '@/features/presence/helpers/priority';

export const isDirectRoom = (room: ChatRoom): room is DirectChatRoom => {
	return room.type === ChatRoomType.DIRECT;
};

export const getRoomName = (room: ChatRoom) => {
	if (isDirectRoom(room)) {
		return room.otherMember.displayName;
	}
	return room.name || room.membersPreview.map((m) => m.displayName).join(', ');
};

export const getRoomAvatarUrl = (room: ChatRoom) => {
	if (isDirectRoom(room)) {
		return room.otherMember.avatarUrl;
	}
	return room.avatarUrl;
};

export const getMemberPlusCount = (room: ChatRoom, maxPreview?: number) => {
	if (isDirectRoom(room)) {
		return 0;
	}
	const maxCount = maxPreview
		? Math.min(maxPreview, room.membersPreview.length)
		: room.membersPreview.length;
	return room.memberCount > maxCount ? room.memberCount - maxCount : 0;
};

export const getRoomStatus = (room: ChatRoom) => {
	const {
		presenceActions: { getFriendStatus },
	} = useWebsocketStore.getState();

	if (isDirectRoom(room)) {
		return getFriendStatus(room.otherMember.id);
	}

	return room.memberIds
		.map((id) => getFriendStatus(id))
		.reduce((highest, status) => {
			return statusPriority[status] > statusPriority[highest] ? status : highest;
		}, PresenceStatus.OFFLINE);
};

export const getStatusText = (status: PresenceStatus) => {
	switch (status) {
		case PresenceStatus.ONLINE:
			return 'Online';
		case PresenceStatus.DO_NOT_DISTURB:
			return 'Do Not Disturb';
		case PresenceStatus.OFFLINE:
			return 'Offline';
	}
};
