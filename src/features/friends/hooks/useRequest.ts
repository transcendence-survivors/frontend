import { useInfiniteQuery } from '@tanstack/react-query';
import { type GetFriendRequestsParams, getFriendRequests } from '../api/get';

export type UseRequestsParams = Pick<GetFriendRequestsParams, 'direction' | 'search'>;

const initialUserRequestsParam = {
	limit: 20,
	orderBy: 'createdDesc',
} satisfies Omit<GetFriendRequestsParams, 'direction'>;

const useRequests = ({ direction, search }: UseRequestsParams) => {
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
