'use client';

import { useTranslations } from 'next-intl';
import { useRoom } from '../../stores/roomSlice';
import { getMemberPlusCount, getRoomName } from '../../utils/room';
import ChatRoomAvatar from './ChatRoomAvatar';
import { DeepKeys } from '@/libs/types';
import { AppMessages } from '@/modules/i18n/messages/types';
import { PresenceStatus } from '@/features/presence/types/status';
import { useRoomStatus } from '../../hooks/room/useChatRoomStatus';

const statusTradMap: Record<
	Exclude<PresenceStatus, 'INVISIBLE'>,
	DeepKeys<AppMessages['chat']>
> = {
	[PresenceStatus.ONLINE]: 'rooms.status.online',
	[PresenceStatus.OFFLINE]: 'rooms.status.offline',
	[PresenceStatus.DO_NOT_DISTURB]: 'rooms.status.dnd',
};

const ChatRoomOverview = () => {
	const room = useRoom();
	const status = useRoomStatus(room);
	const t = useTranslations('chat');
	if (!room) return null;

	const name = getRoomName(room) ?? t('messages.system.deleted_user_fallback');
	const elipsisMembersCount = getMemberPlusCount(room, { showAllOnName: true });
	const displayName =
		`${name} ${elipsisMembersCount ? `(+${elipsisMembersCount})` : ''}`.trim();

	return (
		<div className='flex items-center gap-3 min-w-0'>
			<ChatRoomAvatar room={room} />
			<div className='grid grid-cols-1 min-w-0 flex-1'>
				<h1 className='truncate font-semibold text-lg'>{displayName}</h1>
				<h2 className='truncate font-mono text-[11px] text-muted-foreground'>
					{t(statusTradMap[status])}
				</h2>
			</div>
		</div>
	);
};

export default ChatRoomOverview;
