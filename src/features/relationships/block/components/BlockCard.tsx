import { UserCard, UserCardSkeleton } from '../../../user/components/UserCard';
import { UseBlocksParams } from '../hooks/useBlocks';
import { BlockDelete, BlockDeleteSkeleton } from './BlockDelete';
import { memo } from 'react';

type BlockCardProps = Pick<React.ComponentProps<typeof UserCard>, 'user'> & {
	params: UseBlocksParams;
};

const BlockCard = memo(({ user, params }: BlockCardProps) => {
	return (
		<UserCard user={user}>
			<div className='flex items-center gap-4'>
				<BlockDelete
					params={params}
					blockedId={user.id}
					blockedDisplayName={user.displayName}
				/>
			</div>
		</UserCard>
	);
});

type BlockCardSkeletonProps = React.ComponentProps<typeof UserCardSkeleton>;

const BlockCardSkeleton = ({ ...props }: BlockCardSkeletonProps) => {
	return (
		<UserCardSkeleton {...props}>
			<BlockDeleteSkeleton />
		</UserCardSkeleton>
	);
};

BlockCard.displayName = 'BlockCard';
export { BlockCard, BlockCardSkeleton };
