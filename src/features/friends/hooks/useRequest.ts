import { useInfiniteQuery } from '@tanstack/react-query';
import {
	type FriendRequestDirection,
	type GetFriendRequestsParams,
	getFriendRequests,
} from '../api/get';
import { useQueryState } from 'nuqs';

interface UseRequestsParams {
	direction: FriendRequestDirection;
}

export const initialUserRequestsParam = {
	limit: 20,
	orderBy: 'createdDesc',
} satisfies Omit<GetFriendRequestsParams, 'direction'>;

const useRequests = ({ direction }: UseRequestsParams) => {
	const [search] = useQueryState('search', { defaultValue: '' });

	return useInfiniteQuery({
		queryKey: ['friends', 'requests', direction, search],
		initialPageParam: { ...initialUserRequestsParam, direction, search },
		queryFn: ({ pageParam }) => getFriendRequests(pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.meta.nextCursor!,
			};
		},
	});
};

export { useRequests };
