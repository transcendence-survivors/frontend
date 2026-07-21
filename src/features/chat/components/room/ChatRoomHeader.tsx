import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { ArrowLeft, MoreHorizontal, Settings2 } from 'lucide-react';
import ChatRoomAvatar from './ChatRoomAvatar';
import { ChatRoom } from '../../types';
import { getMemberPlusCount, getRoomName } from '../../utils/room';
import I18nLink from '@/modules/i18n/components/I18nLink';

interface ChatRoomHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	room: ChatRoom;
}

const ChatRoomHeader = ({ room, className, ...props }: ChatRoomHeaderProps) => {
	const name = getRoomName(room);
	const elipsisMembersCount = getMemberPlusCount(room);
	const displayName =
		`${name} ${elipsisMembersCount ? `(+${elipsisMembersCount})` : ''}`.trim();

	return (
		<header
			className={cn(
				'flex justify-between items-center gap-3 border-b border-border px-4 py-3 md:px-6 md:py-4',
				className,
			)}
			{...props}>
			<div className='flex items-center gap-2'>
				<Button
					asChild
					variant='ghost'
					size='icon'
					className='rounded p-2 hover:bg-muted hover:text-foreground md:hidden'>
					<I18nLink href='chat'>
						<ArrowLeft className='h-5 w-5' />
					</I18nLink>
				</Button>
				<div className='flex items-center gap-4 min-w-0'>
					<ChatRoomAvatar room={room} />
					<div className='min-w-0'>
						<div className='truncate font-semibold'>{displayName}</div>
						<div className='truncate font-mono text-[11px] text-muted-foreground'>
							Online · in the dark together
						</div>
					</div>
				</div>
			</div>

			<div className='flex gap-1 text-muted-foreground'>
				<Button
					variant='ghost'
					size='icon'
					className='rounded p-2 hover:bg-muted hover:text-foreground'>
					<Settings2 className='size-4' />
				</Button>
				<Button
					variant='ghost'
					size='icon'
					className='rounded p-2 hover:bg-muted hover:text-foreground'>
					<MoreHorizontal className='size-4' />
				</Button>
			</div>
		</header>
	);
};

export default ChatRoomHeader;
