'use client';

import { Button } from '@/components/ui/button';
import { UserRoundCheck } from 'lucide-react';
import { useRequestAccept } from '../../hooks/useRequestAccept';
import { Spinner } from '@/components/ui/spinner';
import { FriendRequestActionsProps } from './FriendRequestActions';

const FriendRequestAccept = ({
	friendId,
	friendDisplayName,
	direction,
}: FriendRequestActionsProps) => {
	const { mutate, isPending, isError, isSuccess } = useRequestAccept({
		friendId,
		friendDisplayName,
		direction,
	});

	const onClick = () => mutate();

	return (
		<Button
			onClick={onClick}
			disabled={isPending || isError || isSuccess}
			variant={isError ? 'outline' : 'default'}
			aria-invalid={isError}>
			{isPending ? (
				<Spinner className='size-3.5' />
			) : (
				<UserRoundCheck className='size-3.5' />
			)}
			<span className='hidden sm:block'>Accept</span>
		</Button>
	);
};

const FriendRequestAcceptSkeleton = () => {
	return <div className={`w-9 sm:w-23 h-9 bg-muted rounded-md animate-pulse`}></div>;
};

export { FriendRequestAccept, FriendRequestAcceptSkeleton };
