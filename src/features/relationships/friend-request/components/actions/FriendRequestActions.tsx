import { useTranslations } from 'next-intl';
import { FriendRequestAccept, FriendRequestAcceptSkeleton } from './FriendRequestAccept';
import { FriendRequestDelete, FriendRequestDeleteSkeleton } from './FriendRequestDelete';
import { FriendRequestDirection } from '../../types';
import { BaseUser } from '@/features/user/type';

export interface FriendRequestActionsProps {
	user: Omit<BaseUser, 'avatarUrl'>;
	direction: FriendRequestDirection;
}

const FriendRequestActions = ({ user, direction }: FriendRequestActionsProps) => {
	return (
		<div className='flex gap-2'>
			{direction === 'incoming' && <FriendRequestAccept user={user} />}
			<FriendRequestDelete user={user} direction={direction} />
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
