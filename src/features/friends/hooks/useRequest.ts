import { useInfiniteQuery } from '@tanstack/react-query';
import { getFriendRequests, GetFriendRequestsParams } from '../api/get';
import { PaginationResponse } from '@/libs/api/helpers/types';
import { FriendRequest } from '../types';

interface UseRequestsParams {
	direction: GetFriendRequestsParams['direction'];
}

export type FriendRequestsInfinite = {
	pages: PaginationResponse<FriendRequest[]>[];
	pageParams: unknown[];
};

export const initialUserRequestsParam = {
	limit: 20,
	orderBy: 'createdDesc',
} satisfies Omit<GetFriendRequestsParams, 'direction'>;

const useRequests = ({ direction }: UseRequestsParams) => {
	return useInfiniteQuery({
		queryKey: ['friends', 'requests', direction],
		initialPageParam: { ...initialUserRequestsParam, direction },
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
