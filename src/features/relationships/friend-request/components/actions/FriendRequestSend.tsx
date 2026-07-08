'use client';

import { Button } from '@/components/ui/button';
import { UserRoundPlus } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useRequestSend, UseSendFriendRequestParams } from '../../hooks/useRequestSend';

interface FriendRequestSendProps extends UseSendFriendRequestParams {
	ariaLabel: string;
	label?: string;
}

const FriendRequestSend = ({
	userId,
	acceptedMessage,
	failureMessage,
	pendingMessage,
	params,
	ariaLabel,
	label,
}: FriendRequestSendProps) => {
	const { mutate, isPending, isError, isSuccess } = useRequestSend({
		userId,
		acceptedMessage,
		failureMessage,
		pendingMessage,
		params,
	});

	const onClick = () => mutate();

	return (
		<Button
			onClick={onClick}
			disabled={isPending || isError || isSuccess}
			variant={'default'}
			aria-label={ariaLabel}
			aria-invalid={isError}>
			{isPending ? (
				<Spinner className='size-3.5' />
			) : (
				<UserRoundPlus className='size-3.5' />
			)}
			{label && <span className='hidden sm:block'>{label}</span>}
		</Button>
	);
};

const FriendRequestSendSkeleton = () => {
	return <div className={`w-9 sm:w-23 h-9 bg-muted rounded-md animate-pulse`}></div>;
};

export { FriendRequestSend, FriendRequestSendSkeleton };
