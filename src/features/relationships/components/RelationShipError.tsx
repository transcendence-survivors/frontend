import { cn } from '@/libs/utils';

type RelationShipErrorProps = React.HTMLAttributes<HTMLDivElement>;

const RelationShipError = ({ className, children, ...props }: RelationShipErrorProps) => {
	return (
		<div className={cn('py-8 flex text-destructive', className)} {...props}>
			<span className='text-sm font-medium mx-auto'>{children}</span>
		</div>
	);
};

export { RelationShipError };
