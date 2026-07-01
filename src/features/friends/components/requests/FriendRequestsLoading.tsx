import { FriendRequestDirection } from '../../api/get';
import { FriendRequestCardSkeleton } from './FriendRequestCard';

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
					<FriendRequestCardSkeleton direction={direction} />
				</li>
			))}
		</ul>
	);
};

export { FriendRequestsLoading };
