import { useTranslations } from 'next-intl';
import { UserCard, UserCardSkeleton } from '../../../user/components/UserCard';
import { UseFriendsParams } from '../hooks/useFriends';
import { FriendDelete, FriendDeleteSkeleton } from './FriendsDelete';
import { memo } from 'react';

type FriendCardProps = Pick<React.ComponentProps<typeof UserCard>, 'user' | 'badge'> & {
	params: UseFriendsParams;
};

const FriendCard = memo(({ user, badge, params }: FriendCardProps) => {
	const t = useTranslations('relationships.friends');

	return (
		<UserCard user={user} badge={badge}>
			<div className='flex items-center gap-4'>
				<FriendDelete
					params={params}
					friendId={user.id}
					ariaLabel={t('delete_button')}
					successMessage={t('delete_success_displayname', {
						displayName: user.displayName,
					})}
					failureMessage={t('delete_failure_displayname', {
						displayName: user.displayName,
					})}
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
