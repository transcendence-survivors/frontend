import { UserCard, UserCardSkeleton } from '../../../user/components/UserCard';
import { BlockDelete, BlockDeleteSkeleton } from './BlockDelete';
import { memo } from 'react';

type BlockCardProps = Pick<React.ComponentProps<typeof UserCard>, 'user'>;

export const BlockCard = memo(({ user }: BlockCardProps) => {
	return (
		<UserCard user={user}>
			<div className='flex items-center gap-4'>
				<BlockDelete blockedId={user.id} blockedDisplayName={user.displayName} />
			</div>
		</UserCard>
	);
});

BlockCard.displayName = 'BlockCard';

type BlockCardSkeletonProps = React.ComponentProps<typeof UserCardSkeleton>;

export const BlockCardSkeleton = ({ ...props }: BlockCardSkeletonProps) => {
	return (
		<UserCardSkeleton {...props}>
			<BlockDeleteSkeleton />
		</UserCardSkeleton>
	);
};
