import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { UseBlocksParams } from '../hooks/useBlocks';
import { useBlockAdd } from '../hooks/useBlockActions';
import { Ban } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface FriendRequestDeleteProps {
	successMessage: string;
	failureMessage: string;
	ariaLabel: string;
	blockedId: string;
	params: UseBlocksParams;
}

const BlockAdd = ({
	blockedId,
	successMessage,
	failureMessage,
	params,
	ariaLabel,
}: FriendRequestDeleteProps) => {
	const { mutate, isPending, isError } = useBlockAdd({
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
			{isPending ? <Spinner className='size-3.5' /> : <Ban className='size-3.5' />}
		</Button>
	);
};

const BlockDeleteSkeleton = () => {
	return <Skeleton className={`size-9 rounded-md`} />;
};

export { BlockAdd, BlockDeleteSkeleton };
