import { UserCardSkeleton } from '@/features/user/components/UserCard';

interface UsersLoadingProps extends React.HTMLAttributes<HTMLUListElement> {
	numberOfSkeletons?: number;
}

const UsersLoading = ({ numberOfSkeletons = 10, ...props }: UsersLoadingProps) => {
	return (
		<ul className='flex flex-col gap-2' {...props}>
			{Array.from({ length: numberOfSkeletons }).map((_, index) => (
				<li key={index}>
					<UserCardSkeleton />
				</li>
			))}
		</ul>
	);
};

export { UsersLoading };
