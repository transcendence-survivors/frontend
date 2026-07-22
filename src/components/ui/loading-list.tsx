import { cn } from '@/libs/utils';

type LoadingListProps<T extends React.ElementType> = {
	numberOfSkeletons?: number;
	className?: string;
	SkeletonComponent: T;
	skeletonProps?: React.ComponentProps<T>;
} & React.ComponentPropsWithoutRef<'ul'>;

const LoadingList = <T extends React.ElementType>({
	numberOfSkeletons = 10,
	className,
	SkeletonComponent,
	skeletonProps,
	...props
}: LoadingListProps<T>) => {
	return (
		<ul className={cn('flex flex-col gap-2', className)} {...props}>
			{Array.from({ length: numberOfSkeletons }).map((_, index) => (
				<li key={index}>
					<SkeletonComponent {...(skeletonProps as React.ComponentProps<T>)} />
				</li>
			))}
		</ul>
	);
};

export { LoadingList };
