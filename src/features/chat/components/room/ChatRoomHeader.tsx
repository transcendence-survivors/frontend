import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { ArrowLeft, Pencil } from 'lucide-react';
import ChatRoomAvatar from './ChatRoomAvatar';
import { ChatRoom } from '../../types/room';
import { getMemberPlusCount, getRoomName } from '../../utils/room';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { ChatSidebarTrigger } from '../sidebar/ChatSidebarTrigger';
import { ChatMemberRole } from '../../types/member';
import { ChatRoomEditForm } from './ChatRoomForm';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ChatRoomDeleteButton } from './ChatRoomDeleteButton';

interface ChatRoomHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	room: ChatRoom;
	role: ChatMemberRole;
}

const ChatRoomHeader = ({ room, role, className, ...props }: ChatRoomHeaderProps) => {
	const name = getRoomName(room);
	const elipsisMembersCount = getMemberPlusCount(room, { showAllOnName: true });
	const displayName =
		`${name} ${elipsisMembersCount ? `(+${elipsisMembersCount})` : ''}`.trim();

	const isGroup = room.type === 'GROUP';
	const canEdit = isGroup && (role === 'OWNER' || role === 'ADMIN');
	const canDelete = (isGroup && role === 'OWNER') || !isGroup;

	return (
		<header
			className={cn(
				'flex justify-between items-center gap-3 border-b border-border px-4 py-3 md:px-6 md:py-4',
				className,
			)}
			{...props}>
			<div className='flex items-center gap-2'>
				<Button
					variant='ghost'
					size='icon'
					className='rounded p-2 hover:bg-muted hover:text-foreground md:hidden'
					asChild>
					<I18nLink href='chat'>
						<ArrowLeft className='size-4' />
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
				{canDelete && <ChatRoomDeleteButton roomId={room.id} />}
				{canEdit && (
					<ChatRoomEditForm
						roomId={room.id}
						initialName={room.name ?? ''}
						initialAvatarUrl={room.avatarUrl}
					/>
				)}
				{isGroup && <ChatSidebarTrigger />}
			</div>
		</header>
	);
};

export default ChatRoomHeader;
