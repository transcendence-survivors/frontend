import { useTranslations } from 'next-intl';
import { FriendRequestDirection } from '../../api/get';
import { FriendRequestAccept, FriendRequestAcceptSkeleton } from './FriendRequestAccept';
import { FriendRequestDelete, FriendRequestDeleteSkeleton } from './FriendRequestDelete';

export interface FriendRequestActionsProps {
	friendId: string;
	friendDisplayName: string;
	direction: FriendRequestDirection;
}

const FriendRequestActions = ({
	friendId,
	friendDisplayName,
	direction,
}: FriendRequestActionsProps) => {
	const t = useTranslations('friend_page.requests');

	return (
		<div className='flex gap-2'>
			{direction === 'incoming' && (
				<FriendRequestAccept
					friendId={friendId}
					direction={direction}
					successMessage={t('accept_success_from_displayname', {
						displayName: friendDisplayName,
					})}
					failureMessage={t('accept_failure_from_displayname', {
						displayName: friendDisplayName,
					})}
					ariaLabel={t('accept_from_displayname', {
						displayName: friendDisplayName,
					})}
					label={t('accept_button')}
				/>
			)}
			<FriendRequestDelete
				friendId={friendId}
				direction={direction}
				successMessage={t(
					direction === 'incoming'
						? 'delete_success_from_displayname'
						: 'delete_success_to_displayname',
					{ displayName: friendDisplayName },
				)}
				failureMessage={t(
					direction === 'incoming'
						? 'delete_failure_from_displayname'
						: 'delete_failure_to_displayname',
					{ displayName: friendDisplayName },
				)}
				ariaLabel={t(
					direction === 'incoming'
						? 'delete_from_displayname'
						: 'delete_to_displayname',
					{ displayName: friendDisplayName },
				)}
			/>
		</div>
	);
};

const FriendRequestActionsSkeleton = ({
	direction,
}: {
	direction: FriendRequestDirection;
}) => {
	return (
		<div className='flex gap-2'>
			{direction === 'incoming' && <FriendRequestAcceptSkeleton />}
			<FriendRequestDeleteSkeleton />
		</div>
	);
};

export { FriendRequestActions, FriendRequestActionsSkeleton };
