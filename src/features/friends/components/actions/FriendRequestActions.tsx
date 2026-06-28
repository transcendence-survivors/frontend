import { FriendRequestAccept, FriendRequestAcceptSkeleton } from './FriendRequestAccept';
import { FriendRequestDelete, FriendRequestDeleteSkeleton } from './FriendRequestDelete';

export interface FriendRequestActionsProps {
	friendId: string;
	friendDisplayName: string;
}

const FriendRequestActions = ({
	friendId,
	friendDisplayName,
}: FriendRequestActionsProps) => {
	return (
		<div className='flex gap-2'>
			<FriendRequestAccept
				friendId={friendId}
				friendDisplayName={friendDisplayName}
			/>
			<FriendRequestDelete
				friendId={friendId}
				friendDisplayName={friendDisplayName}
			/>
		</div>
	);
};

const FriendRequestActionsSkeleton = () => {
	return (
		<div className='flex gap-2'>
			<FriendRequestAcceptSkeleton />
			<FriendRequestDeleteSkeleton />
		</div>
	);
};

export { FriendRequestActions, FriendRequestActionsSkeleton };
