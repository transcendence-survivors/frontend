import { FriendCardSkeleton } from './FriendCard';

interface FriendsLoadingProps extends React.HTMLAttributes<HTMLUListElement> {
	numberOfSkeletons?: number;
}

const FriendsLoading = ({ numberOfSkeletons = 10, ...props }: FriendsLoadingProps) => {
	return (
		<ul className='flex flex-col gap-2' {...props}>
			{Array.from({ length: numberOfSkeletons }).map((_, index) => (
				<li key={index}>
					<FriendCardSkeleton />
				</li>
			))}
		</ul>
	);
};

export { FriendsLoading };
