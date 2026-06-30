import { FriendRequestDirection } from '../api/get';
import { FriendRequestActionsSkeleton } from './actions/FriendRequestActions';
import { FriendCardSkeleton } from './FriendCard';

interface FriendRequestsLoadingProps extends React.HTMLAttributes<HTMLUListElement> {
	numberOfSkeletons?: number;
	direction: FriendRequestDirection;
}

const FriendRequestsLoading = ({
	numberOfSkeletons = 10,
	direction,
	...props
}: FriendRequestsLoadingProps) => {
	return (
		<ul className='flex flex-col gap-0' {...props}>
			{Array.from({ length: numberOfSkeletons }).map((_, index) => (
				<li key={index}>
					<FriendCardSkeleton
						containerClassName='pb-2'
						bottom={
							<div className='mt-3 pt-3 px-1 bg-muted w-30 h-4 rounded-md animate-pulse' />
						}>
						<FriendRequestActionsSkeleton direction={direction} />
					</FriendCardSkeleton>
				</li>
			))}
		</ul>
	);
};

export { FriendRequestsLoading };
