'use client';

import { useOnlineFriends } from '@/features/presence/hooks/useOnlineFriends';
import { PresenceStatus } from '@/features/presence/types/status';
import { ChatRoom } from '../../types/room';
import { isDirectRoom } from '../../utils/room';
import { statusPriority } from '@/features/presence/helpers/priority';

export const useRoomStatus = (
	room: ChatRoom | null,
): Exclude<PresenceStatus, 'INVISIBLE'> => {
	const { getFriendStatus } = useOnlineFriends();

	if (!room) return PresenceStatus.OFFLINE;
	if (isDirectRoom(room)) return getFriendStatus(room.otherMember.id);

	return room.memberIds
		.map((id) => getFriendStatus(id))
		.reduce((highest, status) => {
			return statusPriority[status] > statusPriority[highest] ? status : highest;
		}, PresenceStatus.OFFLINE);
};
