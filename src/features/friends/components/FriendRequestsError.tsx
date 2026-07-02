import { cn } from '@/libs/utils';

type FriendsErrorProps = React.HTMLAttributes<HTMLDivElement>;

const FriendsError = ({ className, children, ...props }: FriendsErrorProps) => {
	return (
		<div className={cn('py-8 flex text-destructive', className)} {...props}>
			<span className='text-sm font-medium mx-auto'>{children}</span>
		</div>
	);
};

export { FriendsError };
