import Kicker from '@/components/ui/kicker';
import {
	FriendRequestActions,
	FriendRequestActionsSkeleton,
} from './actions/FriendRequestActions';
import { UserCard, UserCardSkeleton } from '../../../user/components/UserCard';
import DisplayDate from '@/components/ui/date';
import { useTranslations } from 'next-intl';
import { FriendRequestDirection, UseRequestsParams } from '../types';

type FriendRequestCardProps = Pick<React.ComponentProps<typeof UserCard>, 'user'> & {
	since: Date;
	params: UseRequestsParams;
};

const FriendRequestCard = ({ user, since, params }: FriendRequestCardProps) => {
	const t = useTranslations('relationships.requests');

	return (
		<UserCard
			user={user}
			containerClassName='pb-2'
			bottom={
				<div className='mt-3 pt-3 px-1 border-t border-border'>
					<Kicker>
						{t(params.direction === 'incoming' ? 'received' : 'sent')} &nbsp;
						<DisplayDate date={new Date(since)} />
					</Kicker>
				</div>
			}>
			<div className='flex items-center gap-4'>
				<FriendRequestActions
					friendId={user.id}
					friendDisplayName={user.displayName}
					params={params}
				/>
			</div>
		</UserCard>
	);
};

interface FriendRequestCardSkeletonProps extends React.ComponentProps<
	typeof UserCardSkeleton
> {
	direction: FriendRequestDirection;
}

const FriendRequestCardSkeleton = ({
	direction,
	...props
}: FriendRequestCardSkeletonProps) => {
	return (
		<UserCardSkeleton
			containerClassName='pb-2'
			bottom={
				<div className='mt-3 pt-3 px-1 bg-muted w-30 h-4 rounded-md animate-pulse' />
			}
			{...props}>
			<FriendRequestActionsSkeleton direction={direction} />
		</UserCardSkeleton>
	);
};

export { FriendRequestCardSkeleton, FriendRequestCard };
