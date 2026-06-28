import { cn } from '@/libs/utils';

interface FriendRequestsErrorProps extends React.HTMLAttributes<HTMLDivElement> {}

const FriendRequestsError = ({ className, ...props }: FriendRequestsErrorProps) => {
	return (
		<div className={cn('py-8 flex', className)} {...props}>
			<span className='text-destructive text-sm font-medium mx-auto'>
				Failed to load friend requests. Please try again later.'
			</span>
		</div>
	);
};

export { FriendRequestsError };
