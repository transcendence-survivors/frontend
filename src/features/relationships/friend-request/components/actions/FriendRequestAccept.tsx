'use client';

import { Button } from '@/components/ui/button';
import { UserRoundCheck } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { FriendRequestActionsProps } from './FriendRequestActions';
import { useRequestAccept } from '../../hooks/useRequestActions';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';

type FriendRequestAcceptProps = Omit<FriendRequestActionsProps, 'direction'>;

const FriendRequestAccept = ({
	user: { id, username, displayName },
}: FriendRequestAcceptProps) => {
	const t = useTranslations('relationships.requests');

	const { mutate, isPending, isError, isSuccess } = useRequestAccept({
		user: { id, username },
		successMessage: t('accept_success_from_displayname', { displayName }),
		failureMessage: t('accept_failure_from_displayname', { displayName }),
		direction: 'incoming',
	});

	const onClick = () => mutate();

	const ariaLabel = t('accept_from_displayname', { displayName });
	const label = t('accept_button');

	return (
		<Button
			onClick={onClick}
			disabled={isPending || isError || isSuccess}
			variant={isError ? 'outline' : 'default'}
			aria-label={ariaLabel}
			aria-invalid={isError}>
			{isPending ? (
				<Spinner className='size-3.5' />
			) : (
				<UserRoundCheck className='size-3.5' />
			)}
			{label && <span className='hidden sm:block'>{label}</span>}
		</Button>
	);
};

const FriendRequestAcceptSkeleton = () => {
	return <Skeleton className={`w-9 sm:w-23 h-9 rounded-md`} />;
};

export { FriendRequestAccept, FriendRequestAcceptSkeleton };
