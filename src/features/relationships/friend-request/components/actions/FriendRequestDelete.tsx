'use client';

import { useTranslations } from 'next-intl';
import { MailX, UserRoundX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';

import { FriendRequestActionsProps } from './FriendRequestActions';
import { useRequestDelete } from '../../hooks/useRequestActions';
import { FriendRequestDirection } from '../../types';
import { NestedMessageKeys } from '@/modules/i18n/messages/types';

interface FriendRequestDeleteProps extends Omit<
	FriendRequestActionsProps,
	'friendDisplayName'
> {
	successMessage: string;
	failureMessage: string;
}

const icons = {
	incoming: <UserRoundX className='size-3.5' />,
	outgoing: <MailX className='size-3.5' />,
} satisfies Record<FriendRequestDirection, React.ReactNode>;

const translationKeys = {
	incoming: 'relationships.requests.reject',
	outgoing: 'relationships.requests.cancel',
} satisfies Record<FriendRequestDirection, NestedMessageKeys>;

export const FriendRequestDelete = ({
	friendId,
	successMessage,
	failureMessage,
	direction,
}: FriendRequestDeleteProps) => {
	const t = useTranslations(translationKeys[direction]);

	const { mutate, isPending, isError } = useRequestDelete({
		friendId,
		successMessage,
		failureMessage,
		direction,
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
								icons[direction]
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

export const FriendRequestDeleteSkeleton = () => {
	return <Skeleton className='size-9 rounded-md' />;
};
