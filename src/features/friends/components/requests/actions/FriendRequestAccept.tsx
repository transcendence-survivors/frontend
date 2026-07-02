'use client';

import { Button } from '@/components/ui/button';
import { UserRoundCheck } from 'lucide-react';
import { useRequestAccept } from '../../../hooks/request/useRequestActions';
import { Spinner } from '@/components/ui/spinner';
import { FriendRequestActionsProps } from './FriendRequestActions';

interface FriendRequestAcceptProps extends Omit<
	FriendRequestActionsProps,
	'friendDisplayName'
> {
	successMessage: string;
	failureMessage: string;
	ariaLabel: string;
	label: string;
}

const FriendRequestAccept = ({
	friendId,
	direction,
	successMessage,
	failureMessage,
	ariaLabel,
	search,
	label,
}: FriendRequestAcceptProps) => {
	const { mutate, isPending, isError, isSuccess } = useRequestAccept({
		friendId,
		direction,
		successMessage,
		failureMessage,
		search,
	});

	const onClick = () => mutate();

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
			<span className='hidden sm:block'>{label}</span>
		</Button>
	);
};

const FriendRequestAcceptSkeleton = () => {
	return <div className={`w-9 sm:w-23 h-9 bg-muted rounded-md animate-pulse`}></div>;
};

export { FriendRequestAccept, FriendRequestAcceptSkeleton };
