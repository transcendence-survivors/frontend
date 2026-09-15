import { UserCard, UserCardSkeleton } from '../../../user/components/UserCard';
import { UseFriendsParams } from '../hooks/useFriends';
import { FriendDeleteButton, FriendDeleteSkeleton } from './FriendsDelete';
import { memo } from 'react';
import { ChatDMButton } from '@/features/chat/components/ChatDMButton';

type FriendCardProps = Pick<React.ComponentProps<typeof UserCard>, 'user' | 'badge'> & {
	params: UseFriendsParams;
};

const FriendCard = memo(({ user, badge, params }: FriendCardProps) => {
	return (
		<UserCard user={user} badge={badge}>
			<div className='flex items-center gap-2'>
				<ChatDMButton targetUserId={user.id} />
				<FriendDeleteButton
					params={params}
					friendId={user.id}
					friendDisplayName={user.displayName}
				/>
			</div>
		</UserCard>
	);
});

type FriendCardSkeletonProps = React.ComponentProps<typeof UserCardSkeleton>;

const FriendCardSkeleton = ({ ...props }: FriendCardSkeletonProps) => {
	return (
		<UserCardSkeleton {...props}>
			<FriendDeleteSkeleton />
		</UserCardSkeleton>
	);
};

FriendCard.displayName = 'FriendCard';
export { FriendCard, FriendCardSkeleton };
