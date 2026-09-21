import { ChatRoom, ChatRoomType, DirectChatRoom } from '../types/room';

export const isDirectRoom = (room: ChatRoom): room is DirectChatRoom => {
	return room.type === ChatRoomType.DIRECT;
};

export const getRoomName = (room: ChatRoom) => {
	if (isDirectRoom(room)) {
		return room.otherMember.displayName;
	}
	return (
		room.name || room.membersPreview.map((m) => m.displayName).join(', ') || 'Group'
	);
};

export const getRoomAvatarUrl = (room: ChatRoom) => {
	if (isDirectRoom(room)) {
		return room.otherMember.avatarUrl;
	}
	return room.avatarUrl;
};

export const getMemberPlusCount = (
	room: ChatRoom,
	{ maxPreview, showAllOnName }: { maxPreview?: number; showAllOnName?: boolean } = {
		maxPreview: undefined,
	},
) => {
	if (isDirectRoom(room)) {
		return 0;
	}
	if (showAllOnName && room.name) {
		return room.memberCount;
	}

	const maxCount = maxPreview
		? Math.min(maxPreview, room.membersPreview.length)
		: room.membersPreview.length;
	return room.memberCount > maxCount ? room.memberCount - maxCount : 0;
};
