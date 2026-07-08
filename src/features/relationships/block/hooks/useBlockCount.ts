'use client';

import { useQuery } from '@tanstack/react-query';
import { GetBlocksCountParams } from '../types';
import { getBlocksCount } from '../api/count';

type UseBlocksCountParams = GetBlocksCountParams;

const useBlocksCount = (params: UseBlocksCountParams) => {
	return useQuery({
		queryKey: ['blocks', params, 'count'],
		queryFn: () => getBlocksCount(params),
	});
};

export { useBlocksCount };
export type { UseBlocksCountParams };
