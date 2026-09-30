'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { GetGamesHistoryParams as GetHistoryParams } from '../types/game';
import { getHistory } from '../api/history';

const initialGameStatsParam = {
	limit: 30,
	orderBy: 'created-desc',
} satisfies GetHistoryParams;

export type UseHistoryParams = Omit<GetHistoryParams, 'cursor' | 'limit'>;

export const useHistory = ({ username, orderBy }: UseHistoryParams) => {
	const currentOrderBy = orderBy ?? initialGameStatsParam.orderBy;

	return useInfiniteQuery({
		queryKey: ['game-history', { username, orderBy: currentOrderBy }],
		initialPageParam: {
			...initialGameStatsParam,
			username,
			orderBy: currentOrderBy,
		},
		queryFn: ({ pageParam }) => getHistory(pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.meta.nextCursor,
			};
		},
	});
};
