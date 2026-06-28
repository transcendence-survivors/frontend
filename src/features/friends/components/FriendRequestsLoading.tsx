import { FriendRequestActionsSkeleton } from './actions/FriendRequestActions';
import { FriendCardSkeleton } from './FriendCard';

interface FriendRequestsLoadingProps extends React.HTMLAttributes<HTMLUListElement> {
	numberOfSkeletons?: number;
}

const FriendRequestsLoading = ({
	numberOfSkeletons = 10,
	...props
}: FriendRequestsLoadingProps) => {
	return (
		<ul {...props}>
			{Array.from({ length: numberOfSkeletons }).map((_, index) => (
				<li key={index}>
					<FriendCardSkeleton>
						<FriendRequestActionsSkeleton />
					</FriendCardSkeleton>
				</li>
			))}
		</ul>
	);
};

export { FriendRequestsLoading };
