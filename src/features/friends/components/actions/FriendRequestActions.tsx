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
	return (
		<div className='flex gap-2'>
			{direction === 'incoming' && (
				<FriendRequestAccept
					friendId={friendId}
					friendDisplayName={friendDisplayName}
					direction={direction}
				/>
			)}
			<FriendRequestDelete
				friendId={friendId}
				friendDisplayName={friendDisplayName}
				direction={direction}
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
