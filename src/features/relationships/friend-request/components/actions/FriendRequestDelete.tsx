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
import { AppMessages } from '@/modules/i18n/messages/types';
import { NestedMessageKeysHelper } from '@/libs/types';

type FriendRequestDeleteProps = FriendRequestActionsProps;

const icons = {
	incoming: <UserRoundX className='size-3.5' />,
	outgoing: <MailX className='size-3.5' />,
} satisfies Record<FriendRequestDirection, React.ReactNode>;

const translationKeys = {
	incoming: 'reject',
	outgoing: 'cancel',
} satisfies Record<
	FriendRequestDirection,
	NestedMessageKeysHelper<AppMessages['relationships']['requests']>
>;

export const FriendRequestDelete = ({
	user: { id, username, displayName },
	direction,
}: FriendRequestDeleteProps) => {
	const t = useTranslations('relationships.requests');

	const { mutate, isPending, isError } = useRequestDelete({
		user: { id, username },
		successMessage: t(
			direction === 'incoming'
				? 'delete_success_from_displayname'
				: 'delete_success_to_displayname',
			{ displayName },
		),
		failureMessage: t(
			direction === 'incoming'
				? 'delete_failure_from_displayname'
				: 'delete_failure_to_displayname',
			{ displayName: displayName },
		),
		direction,
	});

	const startT = translationKeys[direction];
	const label = t(`${startT}.tooltip`);

	return (
		<Tooltip>
			<ActionConfirmDialog
				title={t(`${startT}.title`)}
				description={t(`${startT}.description`)}
				confirmText={t(`${startT}.confirm`)}
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
