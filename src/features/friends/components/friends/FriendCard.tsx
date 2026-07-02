import { UserCard, UserCardSkeleton } from '../UserCard';
import { useTranslations } from 'next-intl';
import { FriendDelete, FriendDeleteSkeleton } from './FriendsDelete';
import { UseFriendsParams } from '../../hooks/friends/useFriends';

type FriendCardProps = Pick<React.ComponentProps<typeof UserCard>, 'friend' | 'badge'> & {
	params: UseFriendsParams;
};

const FriendCard = ({ friend, badge, params }: FriendCardProps) => {
	const t = useTranslations('friend_page.friends');

	return (
		<UserCard friend={friend} badge={badge}>
			<div className='flex items-center gap-4'>
				<FriendDelete
					params={params}
					friendId={friend.id}
					ariaLabel={t('delete_button')}
					successMessage={t('delete_success_displayname', {
						displayName: friend.displayName,
					})}
					failureMessage={t('delete_failure_displayname', {
						displayName: friend.displayName,
					})}
				/>
			</div>
		</UserCard>
	);
};

type FriendCardSkeletonProps = React.ComponentProps<typeof UserCardSkeleton>;

const FriendCardSkeleton = ({ ...props }: FriendCardSkeletonProps) => {
	return (
		<UserCardSkeleton {...props}>
			<FriendDeleteSkeleton />
		</UserCardSkeleton>
	);
};

export { FriendCard, FriendCardSkeleton };
