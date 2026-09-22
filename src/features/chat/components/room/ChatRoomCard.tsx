'use client';

import { Button } from '@/components/ui/button';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { ChatRoom, ChatRoomType } from '../../types/room';
import { memo } from 'react';
import { UseChatRoomsParams } from '../../hooks/room/useChatRooms';
import { Skeleton } from '@/components/ui/skeleton';
import ChatRoomAvatar from './ChatRoomAvatar';
import { getRoomName } from '../../utils/room';
import DisplayDate from '@/components/ui/date';
import { useTranslations } from 'next-intl';
import { getMessagePreview } from '../../utils/message';
import NotificationBubble from '@/components/ui/notification-bubble';
import { DeepKeys } from '@/libs/types';
import { AppMessages } from '@/modules/i18n/messages/types';
import { useCurrentRoomId, useRoomUnreadCount } from '../../stores/notificationSlice';

interface ChatRoomCardProps {
	room: ChatRoom;
	params: UseChatRoomsParams;
}

const typeMap = {
	[ChatRoomType.GROUP]: 'rooms.type.group',
	[ChatRoomType.DIRECT]: 'rooms.type.direct',
} as const satisfies Record<ChatRoom['type'], DeepKeys<AppMessages['chat']>>;

const ChatRoomCard = memo(({ room, params }: ChatRoomCardProps) => {
	const currentRoomId = useCurrentRoomId();
	const isActive = currentRoomId === room.id;
	const liveUnreadCount = useRoomUnreadCount(room.id);
	const t = useTranslations('chat');
	const name = getRoomName(room);
	const messagePreview = getMessagePreview(room.lastMessage, t);
	const unreadCount = isActive
		? 0
		: liveUnreadCount === -1
			? room.unreadCount
			: liveUnreadCount;

	return (
		<article>
			<Button
				variant='sidebar'
				size='lg'
				data-active={isActive}
				className={`h-25 px-0 py-0 flex flex-col justify-baseline overflow-hidden w-full transition-colors ${isActive ? '' : 'border-b border-border'}`}
				asChild>
				<I18nLink
					href={'chatId'}
					hrefParams={{ id: room.id }}
					queryParams={params}>
					<span className='flex items-center w-full bg-muted text-[10px] uppercase font-bold px-2 py-1'>
						{t(typeMap[room.type])}
					</span>
					<div className='grid grid-cols-[60px_auto_auto] items-center gap-3 w-full px-4 py-2'>
						<ChatRoomAvatar room={room} />

						<div className='min-w-0 h-full pt-1'>
							<h3 className='truncate font-semibold'>{name}</h3>
							<span className='truncate text-[11px] text-muted-foreground font-light block tracking-tight'>
								{messagePreview}
							</span>
						</div>

						{room.lastMessage && (
							<div className='flex shrink-0 flex-col h-full pt-1.5 items-end justify-start gap-1'>
								<span className='font-mono text-[9px] tracking-[-0.1em] text-muted-foreground'>
									<DisplayDate
										date={room.lastMessage.createdAt}
										formatOptions={{
											month: 'short',
											day: 'numeric',
											hour: '2-digit',
										}}
									/>
								</span>
								{unreadCount > 0 && (
									<NotificationBubble count={unreadCount} />
								)}
							</div>
						)}
					</div>
				</I18nLink>
			</Button>
		</article>
	);
});

const ChatRoomCardSkeleton = () => {
	return (
		<article>
			<Button
				variant='sidebar'
				size='lg'
				className='h-20 grid grid-cols-[60px_auto_auto] justify-baseline w-full gap-3 px-4 py-3 text-left border-b border-border'
				disabled>
				<div>
					<div className='relative'>
						<Skeleton className='size-12 rounded-full' />
						<Skeleton className='absolute size-2 rounded-full right-0 bottom-1' />
					</div>
				</div>

				<div className='min-w-0 space-y-2'>
					<Skeleton className='h-4 w-32 rounded-md' />
					<Skeleton className='h-3 w-48 rounded-md' />
				</div>

				<div className='flex shrink-0 flex-col items-end gap-2'>
					<Skeleton className='h-3 w-10 rounded-md' />
					<Skeleton className='size-4 rounded-md' />
				</div>
			</Button>
		</article>
	);
};

ChatRoomCard.displayName = 'ChatRoomCard';

export { ChatRoomCard, ChatRoomCardSkeleton };
