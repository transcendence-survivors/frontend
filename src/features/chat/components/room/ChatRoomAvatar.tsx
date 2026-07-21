'use client';

import { ChatRoom, ChatRoomType } from '../../types';
import {
	AvatarProfile,
	AvatarProfileBadge,
	AvatarProfileCount,
} from '@/features/user/components/Avatar/AvatarProfile';
import { AvatarGroup } from '@/components/ui/avatar';
import {
	getMemberPlusCount,
	getRoomAvatarUrl,
	getRoomName,
	getRoomStatus,
} from '../../utils/room';

interface ChatRoomAvatarProps {
	room: ChatRoom;
}

const MAX_AVATARS = 2;

const ChatRoomAvatar = ({ room }: ChatRoomAvatarProps) => {
	const isDirect = room.type === ChatRoomType.DIRECT;
	const name = getRoomName(room);
	const avatarUrl = getRoomAvatarUrl(room);
	const status = getRoomStatus(room);

	const displayedMembers = isDirect ? [] : room.membersPreview.slice(0, MAX_AVATARS);
	const memberPlusCount = getMemberPlusCount(room, MAX_AVATARS);

	return (
		<div className='w-16'>
			<AvatarGroup
				className={`-space-x-6 relative ${isDirect ? 'w-14' : 'w-full'}`}>
				{isDirect || avatarUrl ? (
					<AvatarProfile
						img={{
							src: avatarUrl || ``,
							alt: name,
						}}
						size='lg'
						className='ml-0.5'
					/>
				) : (
					!isDirect && (
						<>
							{displayedMembers.map((member, i) => (
								<AvatarProfile
									key={member.id}
									img={{
										src: member.avatarUrl || ``,
										alt: member.displayName,
									}}
									style={{ marginTop: `${i * 8}px` }}
									size='md'
								/>
							))}
							{room.memberCount > displayedMembers.length && (
								<AvatarProfileCount
									size='xs'
									className='ml-2 text-[10px]'>
									+{memberPlusCount}
								</AvatarProfileCount>
							)}
						</>
					)
				)}
				<AvatarProfileBadge badgeState={status} className='size-2 right-2.5' />
			</AvatarGroup>
		</div>
	);
};

export default ChatRoomAvatar;
