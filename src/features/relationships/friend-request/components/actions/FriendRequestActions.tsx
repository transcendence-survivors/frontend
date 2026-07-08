import { useTranslations } from 'next-intl';
import { FriendRequestAccept, FriendRequestAcceptSkeleton } from './FriendRequestAccept';
import { FriendRequestDelete, FriendRequestDeleteSkeleton } from './FriendRequestDelete';
import { FriendRequestDirection, UseRequestsParams } from '../../types';

export interface FriendRequestActionsProps {
	friendId: string;
	friendDisplayName: string;
	params: UseRequestsParams;
}

const FriendRequestActions = ({
	friendId,
	friendDisplayName,
	params,
}: FriendRequestActionsProps) => {
	const t = useTranslations('relationships.requests');

	return (
		<div className='flex gap-2'>
			{params.direction === 'incoming' && (
				<FriendRequestAccept
					friendId={friendId}
					params={params}
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
				params={params}
				successMessage={t(
					params.direction === 'incoming'
						? 'delete_success_from_displayname'
						: 'delete_success_to_displayname',
					{ displayName: friendDisplayName },
				)}
				failureMessage={t(
					params.direction === 'incoming'
						? 'delete_failure_from_displayname'
						: 'delete_failure_to_displayname',
					{ displayName: friendDisplayName },
				)}
				ariaLabel={t(
					params.direction === 'incoming'
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
