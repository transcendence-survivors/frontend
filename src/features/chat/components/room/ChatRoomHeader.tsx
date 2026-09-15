import { cn } from '@/libs/utils';
import ChatRoomAvatar from './ChatRoomAvatar';
import { ChatRoom } from '../../types/room';
import { getMemberPlusCount, getRoomName } from '../../utils/room';
import {
	ChatMemberSidebarTrigger,
	ChatRoomsSidebarTrigger,
} from '../sidebar/ChatSidebarTrigger';
import { ChatMemberRole } from '../../types/member';
import { ChatRoomEditForm } from './ChatRoomForm';
import { ChatRoomDeleteButton } from './ChatRoomDeleteButton';
import { ChatLeaveButton } from '../member/actions/ChatLeaveButton';

interface ChatRoomHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	room: ChatRoom;
	role: ChatMemberRole;
}

const ChatRoomHeader = ({ room, role, className, ...props }: ChatRoomHeaderProps) => {
	const name = getRoomName(room);
	const elipsisMembersCount = getMemberPlusCount(room, { showAllOnName: true });
	const displayName =
		`${name} ${elipsisMembersCount ? `(+${elipsisMembersCount})` : ''}`.trim();

	const isOwner = role === 'OWNER';
	const isAdmin = role === 'ADMIN';

	const isGroup = room.type === 'GROUP';
	const canEdit = isGroup && (isOwner || isAdmin);
	const canDelete = (isGroup && isOwner) || !isGroup;
	const canLeave = isGroup && !isOwner;

	return (
		<header
			className={cn(
				'flex flex-col-reverse md:flex-row justify-between gap-3 border-b border-border px-4 py-3 md:px-6 md:py-4 w-full min-w-0',
				className,
			)}
			{...props}>
			<div className='flex items-center gap-4 min-w-0'>
				<div className='hidden md:block text-muted-foreground'>
					<ChatRoomsSidebarTrigger />
				</div>
				<div className='flex items-center gap-3 min-w-0'>
					<ChatRoomAvatar room={room} />
					<div className='grid grid-cols-1 min-w-0 flex-1'>
						<h1 className='truncate font-semibold text-lg'>{displayName}</h1>
						<h2 className='truncate font-mono text-[11px] text-muted-foreground'>
							Online · in the dark together
						</h2>
					</div>
				</div>
			</div>

			<div className='flex items-center justify-between gap-2 min-w-0'>
				<div className='md:hidden text-muted-foreground'>
					<ChatRoomsSidebarTrigger />
				</div>
				<div className='flex items-center gap-1 text-muted-foreground ml-auto'>
					{canLeave && <ChatLeaveButton roomId={room.id} />}
					{canDelete && <ChatRoomDeleteButton roomId={room.id} />}
					{canEdit && (
						<ChatRoomEditForm
							roomId={room.id}
							initialName={room.name ?? ''}
							initialAvatarUrl={room.avatarUrl}
						/>
					)}
					{isGroup && <ChatMemberSidebarTrigger />}
				</div>
			</div>
		</header>
	);
};

export default ChatRoomHeader;
