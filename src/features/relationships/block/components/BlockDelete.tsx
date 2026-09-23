'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import { Unban } from '@/components/icons/unban';
import { useBlockDelete } from '../hooks/useBlockActions';

interface BlockDeleteProps {
	blockedId: string;
	blockedDisplayName: string;
}

const BlockDelete = ({ blockedId, blockedDisplayName }: BlockDeleteProps) => {
	const t = useTranslations('relationships.blocked.remove');

	const { mutate, isPending, isError } = useBlockDelete({
		blockedId,
		successMessage: t('success_displayname', { displayName: blockedDisplayName }),
		failureMessage: t('failure_displayname', { displayName: blockedDisplayName }),
	});

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
