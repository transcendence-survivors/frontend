import Kicker from '@/components/ui/kicker';
import { FriendRequestDirection } from '../../api/get';
import {
	FriendRequestActions,
	FriendRequestActionsSkeleton,
} from '../actions/FriendRequestActions';
import { FriendCard, FriendCardSkeleton } from '../FriendCard';
import DisplayDate from '@/components/ui/date';

type FriendRequestCardProps = Pick<React.ComponentProps<typeof FriendCard>, 'friend'> & {
	since: Date;
	direction: FriendRequestDirection;
};

const FriendRequestCard = ({ friend, since, direction }: FriendRequestCardProps) => {
	return (
		<FriendCard
			friend={friend}
			containerClassName='pb-2'
			bottom={
				<div className='mt-3 pt-3 px-1 border-t border-border'>
					<Kicker>
						{direction === 'incoming' ? 'Received' : 'Sent'}{' '}
						<DisplayDate date={new Date(since)} />
					</Kicker>
				</div>
			}>
			<div className='flex items-center gap-4'>
				<FriendRequestActions
					friendId={friend.id}
					friendDisplayName={friend.displayName}
					direction={direction}
				/>
			</div>
		</FriendCard>
	);
};

interface FriendRequestCardSkeletonProps extends React.ComponentProps<
	typeof FriendCardSkeleton
> {
	direction: FriendRequestDirection;
}

const FriendRequestCardSkeleton = ({
	direction,
	...props
}: FriendRequestCardSkeletonProps) => {
	return (
		<FriendCardSkeleton
			containerClassName='pb-2'
			bottom={
				<div className='mt-3 pt-3 px-1 bg-muted w-30 h-4 rounded-md animate-pulse' />
			}
			{...props}>
			<FriendRequestActionsSkeleton direction={direction} />
		</FriendCardSkeleton>
	);
};

export { FriendRequestCardSkeleton, FriendRequestCard };
