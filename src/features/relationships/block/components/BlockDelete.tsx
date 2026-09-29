'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import { Unban } from '@/components/icons/unban';
import { useBlockDelete } from '../hooks/useBlockActions';
import { BaseUser } from '@/features/user/type';

interface BlockDeleteProps {
	user: Omit<BaseUser, 'avatarUrl'>;
	children?: React.ReactNode;
}

const BlockDelete = ({ user, children }: BlockDeleteProps) => {
	const t = useTranslations('relationships.blocked.remove');

	const { mutate, isPending, isError } = useBlockDelete({
		blockedId: user.id,
		blockedUsername: user.username,
		successMessage: t('success_displayname', { displayName: user.displayName }),
		failureMessage: t('failure_displayname', { displayName: user.displayName }),
	});
	if (children) {
		return (
			<ActionConfirmDialog
				title={t('title')}
				description={t('description')}
				confirmText={t('confirm')}
				isPending={isPending}
				onConfirm={() => mutate()}
				trigger={children}
			/>
		);
	}

	const label = t('tooltip');

	return (
		<Tooltip>
			<ActionConfirmDialog
				title={t('title')}
				description={t('description')}
				confirmText={t('confirm')}
				isPending={isPending}
				onConfirm={() => mutate()}
				trigger={
					<TooltipTrigger asChild>
						<Button
							type='button'
							variant='outline'
							size='icon'
							disabled={isPending || isError}
							aria-invalid={isError}
							aria-label={label}>
							{isPending ? (
								<Spinner className='size-3.5' />
							) : (
								<Unban className='size-3.5' />
							)}
						</Button>
					</TooltipTrigger>
				}
			/>
			<TooltipContent>
				<p>{label}</p>
			</TooltipContent>
		</Tooltip>
	);
};

const BlockDeleteSkeleton = () => {
	return <Skeleton className='size-9 rounded-md' />;
};

export { BlockDelete, BlockDeleteSkeleton };
