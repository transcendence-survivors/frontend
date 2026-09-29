'use client';

import { useQuery } from '@tanstack/react-query';
import { GetBlocksCountParams } from '../types';
import { getBlocksCount } from '../api/block';

export type UseBlocksCountParams = GetBlocksCountParams;

export const useBlocksCount = (params: UseBlocksCountParams) => {
	return useQuery({
		queryKey: ['blocks-count', params],
		queryFn: () => getBlocksCount(params),
	});
};
