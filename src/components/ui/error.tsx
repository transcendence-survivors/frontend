import { cn } from '@/libs/utils';

type ErrorProps = React.HTMLAttributes<HTMLDivElement>;

const Error = ({ className, children, ...props }: ErrorProps) => {
	return (
		<div
			className={cn(
				'py-8 flex text-destructive max-w-3/4 mx-auto text-center',
				className,
			)}
			{...props}>
			<span className='text-sm font-medium mx-auto'>{children}</span>
		</div>
	);
};

export { Error };
