'use client';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useRequestAccept } from '../../hooks/useRequestAccept';
import { Spinner } from '@/components/ui/spinner';
import { FriendRequestActionsProps } from './FriendRequestActions';

const FriendRequestAccept = ({
	friendId,
	friendDisplayName,
}: FriendRequestActionsProps) => {
	const { mutate, isPending, isError, isSuccess } = useRequestAccept(
		friendId,
		friendDisplayName,
	);

	const onClick = () => mutate(friendId);

	return (
		<Button
			onClick={onClick}
			disabled={isPending || isError || isSuccess}
			variant={isError ? 'outline' : 'default'}
			aria-invalid={isError}>
			{isPending ? (
				<Spinner className='size-3.5' />
			) : (
				<Check className='size-3.5' />
			)}
			<span>Accept</span>
		</Button>
	);
};

const FriendRequestAcceptSkeleton = () => {
	const bgColor = 'bg-muted';
	return <div className={`w-23 h-9 ${bgColor} rounded-md animate-pulse`}></div>;
};

export { FriendRequestAccept, FriendRequestAcceptSkeleton };
