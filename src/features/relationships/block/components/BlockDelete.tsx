import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { UseBlocksParams } from '../hooks/useBlocks';
import { useBlockDelete } from '../hooks/useBlockActions';
import { Unban } from '@/components/icons/unban';

interface FriendRequestDeleteProps {
	successMessage: string;
	failureMessage: string;
	ariaLabel: string;
	blockedId: string;
	params: UseBlocksParams;
}

const BlockDelete = ({
	blockedId,
	successMessage,
	failureMessage,
	params,
	ariaLabel,
}: FriendRequestDeleteProps) => {
	const { mutate, isPending, isError } = useBlockDelete({
		blockedId,
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
			{isPending ? (
				<Spinner className='size-3.5' />
			) : (
				<Unban className='size-3.5' />
			)}
		</Button>
	);
};

const BlockDeleteSkeleton = () => {
	return <div className={`size-9 bg-muted rounded-md animate-pulse`}></div>;
};

export { BlockDelete, BlockDeleteSkeleton };
