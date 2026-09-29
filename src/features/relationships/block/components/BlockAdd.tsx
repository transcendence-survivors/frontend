'use client';

import { useTranslations } from 'next-intl';
import { Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import { useBlockAdd } from '../hooks/useBlockActions';
import { BaseUser } from '@/features/user/type';

interface BlockAddButtonProps {
	user: Omit<BaseUser, 'avatarUrl'>;
}

export const BlockAddButton = ({ user }: BlockAddButtonProps) => {
	const t = useTranslations('relationships.blocked.add');

	const { mutate, isPending, isError } = useBlockAdd({
		blockedId: user.id,
		blockedUsername: user.username,
		successMessage: t('success_displayname', { displayName: user.displayName }),
		failureMessage: t('failure_displayname', { displayName: user.displayName }),
	});

	const label = t('tooltip');

	return (
		<Tooltip>
			<ActionConfirmDialog
				title={t('title')}
				description={t('description')}
				confirmText={t('confirm')}
				isDestructive
				isPending={isPending}
				onConfirm={() => mutate()}
				trigger={
					<TooltipTrigger asChild>
						<Button
							type='button'
							variant='destructive'
							size='icon'
							className='text-muted-foreground hover:border-destructive/60 hover:text-destructive'
							disabled={isPending || isError}
							aria-invalid={isError}
							aria-label={label}>
							{isPending ? (
								<Spinner className='size-3.5' />
							) : (
								<Ban className='size-3.5' />
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

export const BlockAddButtonSkeleton = () => {
	return <Skeleton className='size-9 rounded-md' />;
};
