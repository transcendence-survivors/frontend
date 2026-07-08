import { useTranslations } from 'next-intl';
import { UserCard, UserCardSkeleton } from '../../../user/components/UserCard';
import { UseBlocksParams } from '../hooks/useBlocks';
import { BlockDelete, BlockDeleteSkeleton } from './BlockDelete';

type BlockCardProps = Pick<React.ComponentProps<typeof UserCard>, 'user'> & {
	params: UseBlocksParams;
};

const BlockCard = ({ user, params }: BlockCardProps) => {
	const t = useTranslations('relationships.blocked');

	return (
		<UserCard user={user}>
			<div className='flex items-center gap-4'>
				<BlockDelete
					params={params}
					blockedId={user.id}
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
};

type BlockCardSkeletonProps = React.ComponentProps<typeof UserCardSkeleton>;

const BlockCardSkeleton = ({ ...props }: BlockCardSkeletonProps) => {
	return (
		<UserCardSkeleton {...props}>
			<BlockDeleteSkeleton />
		</UserCardSkeleton>
	);
};

export { BlockCard, BlockCardSkeleton };
