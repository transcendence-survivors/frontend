'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { UserRoundMinus } from 'lucide-react';
import { UseFriendsParams } from '../hooks/useFriends';
import { useFriendDelete } from '../hooks/useFriendActions';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import { useTranslations } from 'next-intl';

interface FriendDeleteProps {
	friendId: string;
	friendDisplayName: string;
	params: UseFriendsParams;
}

export const FriendDeleteButton = ({
	friendId,
	friendDisplayName,
	params,
}: FriendDeleteProps) => {
	const t = useTranslations('relationships.friends.delete');

	const { mutate, isPending, isError } = useFriendDelete({
		friendId,
		successMessage: t('success_displayname', {
			displayName: friendDisplayName,
		}),
		failureMessage: t('failure_displayname', {
			displayName: friendDisplayName,
		}),
		params,
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
							variant='outline'
							size='icon'
							className='text-muted-foreground hover:border-destructive/60 hover:text-destructive'
							disabled={isPending || isError}
							aria-invalid={isError}
							aria-label={label}>
							{isPending ? (
								<Spinner className='size-3.5' />
							) : (
								<UserRoundMinus className='size-3.5' />
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

export const FriendDeleteSkeleton = () => {
	return <Skeleton className={`size-9 rounded-md`} />;
};
