'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getFriendsFromIds, GetFriendsParams, IdsParams } from '../../api/get-friends';

export type UseFriendsParams = Pick<GetFriendsParams, 'search'> & IdsParams;

const initialFriendsParam = {
	limit: 20,
	orderBy: 'userNameAsc',
} satisfies GetFriendsParams;

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
