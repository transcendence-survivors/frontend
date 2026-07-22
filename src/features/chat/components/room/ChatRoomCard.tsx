import { Button } from '@/components/ui/button';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { ChatRoom } from '../../types';
import { memo } from 'react';
import { UseChatRoomsParams } from '../../hooks/useChatRooms';
import { Skeleton } from '@/components/ui/skeleton';
import ChatRoomAvatar from './ChatRoomAvatar';
import { getRoomName } from '../../utils/room';

interface ChatRoomCardProps {
	room: ChatRoom;
	isActive?: boolean;
	params: UseChatRoomsParams;
}

const ChatRoomCard = memo(({ room, isActive, params }: ChatRoomCardProps) => {
	const name = getRoomName(room);

	return (
		<article>
			<Button
				variant='sidebar'
				size='lg'
				data-active={isActive}
				className={`h-20 grid grid-cols-[60px_auto_auto] justify-baseline w-full gap-3 px-4 py-3 text-left ${isActive ? '' : 'border-b border-border'}`}
				asChild>
				<I18nLink
					href={'chatId'}
					hrefParams={{ id: room.id }}
					queryParams={params}>
					<ChatRoomAvatar room={room} />

					<div className='min-w-0'>
						<h3 className='truncate font-semibold'>{name}</h3>
						<span className='truncate text-xs text-muted-foreground font-light'>
							{room.lastMessage?.content || 'No messages yet'}
						</span>
					</div>

					{room.lastMessage && (
						<div className='flex shrink-0 flex-col items-end gap-1'>
							<span className='font-mono text-[10px] text-muted-foreground'>
								{room.lastMessage?.createdAt}
							</span>
							{/* {c.unread && (
							<span className='rounded-sm bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground'>
								{c.unread}
							</span>
						)} */}
						</div>
					)}
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
				</div>
			</Button>
		</article>
	);
};

ChatRoomCard.displayName = 'ChatRoomCard';

export { ChatRoomCard, ChatRoomCardSkeleton };
