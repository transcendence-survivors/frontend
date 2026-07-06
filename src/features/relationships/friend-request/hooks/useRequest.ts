'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { UseRequestsParams, type GetFriendRequestsParams } from '../types';
import { getFriendRequests } from '../api/get';

const initialUserRequestsParam = {
	limit: 50,
	orderBy: 'created-desc',
} satisfies Omit<GetFriendRequestsParams, 'direction'>;

const useRequests = ({ direction, search }: UseRequestsParams) => {
	return useInfiniteQuery({
		queryKey: ['friend-requests', { direction, search }],
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
