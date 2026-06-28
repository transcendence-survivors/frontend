'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useRequestDelete } from '../../hooks/useRequestDelete';
import { Spinner } from '@/components/ui/spinner';
import { FriendRequestActionsProps } from './FriendRequestActions';

const FriendRequestDelete = ({
	friendId,
	friendDisplayName,
}: FriendRequestActionsProps) => {
	const { mutate, isPending, isError } = useRequestDelete(friendId, friendDisplayName);
	const onClick = () => mutate(friendId);

	return (
		<Button
			variant='outline'
			size={'icon'}
			className={`text-muted-foreground hover:border-destructive/60 hover:text-destructive`}
			disabled={isPending || isError}
			aria-invalid={isError}
			onClick={onClick}>
			{isPending ? <Spinner className='size-3.5' /> : <X className='size-3.5' />}
		</Button>
	);
};

const FriendRequestDeleteSkeleton = () => {
	const bgColor = 'bg-muted';
	return <div className={`size-9 ${bgColor} rounded-md animate-pulse`}></div>;
};

export { FriendRequestDelete, FriendRequestDeleteSkeleton };
