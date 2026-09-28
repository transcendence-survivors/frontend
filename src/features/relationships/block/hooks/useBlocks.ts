'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getBlocks } from '../api/block';
import { GetBlocksParams } from '../types';

const initialBlocksParam = {
	limit: 50,
	orderBy: 'username-asc',
} satisfies GetBlocksParams;

export type UseBlocksParams = Omit<GetBlocksParams, 'cursor' | 'limit' | 'orderBy'>;

export const useBlocks = ({ search }: UseBlocksParams) => {
	return useInfiniteQuery({
		queryKey: ['blocks', { search }],
		initialPageParam: { ...initialBlocksParam, search },
		queryFn: ({ pageParam }) => getBlocks(pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.meta.nextCursor,
			};
		},
	});
};
