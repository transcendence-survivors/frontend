'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getFriendsFromIds } from '../api/get';
import { GetFriendIdsParams, GetFriendsParams } from '../types';

const initialFriendsParam = {
	limit: 50,
	orderBy: 'username-asc',
} satisfies GetFriendsParams;

type UseFriendsParams = Omit<GetFriendIdsParams, 'cursor' | 'limit'>;

const useFriends = ({ search, friendIds, status }: UseFriendsParams) => {
	return useInfiniteQuery({
		queryKey: ['friends', { search, friendIds, status }],
		initialPageParam: { ...initialFriendsParam, search, friendIds, status },
		queryFn: ({ pageParam }) => getFriendsFromIds(pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.meta.nextCursor,
			};
		},
	});
};

export { useFriends };
export type { UseFriendsParams };
