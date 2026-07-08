import { BlockCardSkeleton } from './BlockCard';

interface BlocksLoadingProps extends React.HTMLAttributes<HTMLUListElement> {
	numberOfSkeletons?: number;
}

const BlocksLoading = ({ numberOfSkeletons = 10, ...props }: BlocksLoadingProps) => {
	return (
		<ul className='flex flex-col gap-2' {...props}>
			{Array.from({ length: numberOfSkeletons }).map((_, index) => (
				<li key={index}>
					<BlockCardSkeleton />
				</li>
			))}
		</ul>
	);
};

export { BlocksLoading };
