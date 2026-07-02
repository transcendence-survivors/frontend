import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useFriendDelete } from '../../hooks/friends/useFriendActions';
import { X } from 'lucide-react';
import { UseFriendsParams } from '../../hooks/friends/useFriends';

interface FriendRequestDeleteProps {
	successMessage: string;
	failureMessage: string;
	ariaLabel: string;
	friendId: string;
	params: UseFriendsParams;
}

const FriendDelete = ({
	friendId,
	successMessage,
	failureMessage,
	params,
	ariaLabel,
}: FriendRequestDeleteProps) => {
	const { mutate, isPending, isError } = useFriendDelete({
		friendId,
		successMessage,
		failureMessage,
		params,
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
			{isPending ? <Spinner className='size-3.5' /> : <X className='size-3.5' />}
		</Button>
	);
};

const FriendDeleteSkeleton = () => {
	return <div className={`size-9 bg-muted rounded-md animate-pulse`}></div>;
};

export { FriendDelete, FriendDeleteSkeleton };
