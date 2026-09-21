'use client';

import { useRoom, useRoomRole } from '../../stores/roomSlice';
import { ChatLeaveButton } from '../member/actions/ChatLeaveButton';
import { ChatMemberSidebarTrigger } from '../sidebar/ChatSidebarTrigger';
import { ChatRoomDeleteButton } from './ChatRoomDeleteButton';
import { ChatRoomEditForm } from './ChatRoomForm';

const ChatRoomActions = () => {
	const room = useRoom();
	const role = useRoomRole();

	if (!room) return null;
	const isOwner = role === 'OWNER';
	const isAdmin = role === 'ADMIN';

	const isGroup = room.type === 'GROUP';

	const canEdit = isGroup && (isOwner || isAdmin);
	const canDelete = (isGroup && isOwner) || !isGroup;
	const canLeave = isGroup && !isOwner;

	return (
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
	);
};

export default ChatRoomActions;
