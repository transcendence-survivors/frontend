'use client';

import { Button } from '@/components/ui/button';
import { X, CircleX } from 'lucide-react';
import { useRequestDelete } from '../../hooks/useRequestActions';
import { Spinner } from '@/components/ui/spinner';
import { FriendRequestActionsProps } from './FriendRequestActions';
import { FriendRequestDirection } from '../../api/get';

interface FriendRequestDeleteProps extends Omit<
	FriendRequestActionsProps,
	'friendDisplayName'
> {
	successMessage: string;
	failureMessage: string;
	ariaLabel: string;
}

const icons = {
	incoming: <X className='size-3.5' />,
	outgoing: <CircleX className='size-3.5' />,
} satisfies Record<FriendRequestDirection, React.ReactNode>;

const FriendRequestDelete = ({
	friendId,
	direction,
	successMessage,
	failureMessage,
	ariaLabel,
}: FriendRequestDeleteProps) => {
	const { mutate, isPending, isError } = useRequestDelete({
		friendId,
		direction,
		successMessage,
		failureMessage,
	});

	const onClick = () => mutate();

	return (
		<Button
			variant='outline'
			size={'icon'}
			className={`text-muted-foreground hover:border-destructive/60 hover:text-destructive`}
			disabled={isPending || isError}
			aria-invalid={isError}
			aria-label={ariaLabel}
			onClick={onClick}>
			{isPending ? <Spinner className='size-3.5' /> : icons[direction]}
		</Button>
	);
};

const FriendRequestDeleteSkeleton = () => {
	return <div className={`size-9 bg-muted rounded-md animate-pulse`}></div>;
};

export { FriendRequestDelete, FriendRequestDeleteSkeleton };
