'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { GetLeaderboardParams } from '../types/leaderboard';
import { getLeaderboard } from '../api/leaderboard';

const initialLeaderboardParam = {
	limit: 30,
	orderBy: 'highest-kills-desc',
} satisfies GetLeaderboardParams;

export type UseLeaderboardParams = Omit<GetLeaderboardParams, 'cursor' | 'limit'>;

export const useLeaderboard = ({ orderBy }: UseLeaderboardParams = {}) => {
	const currentOrderBy = orderBy ?? initialLeaderboardParam.orderBy;
	console.log('useLeaderboard called with orderBy:', currentOrderBy);
	return useInfiniteQuery({
		queryKey: ['game-leaderboard', { orderBy: currentOrderBy }],
		initialPageParam: {
			...initialLeaderboardParam,
			orderBy: currentOrderBy,
		},
		queryFn: ({ pageParam }) => getLeaderboard(pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.meta.nextCursor,
			};
		},
	});
};
