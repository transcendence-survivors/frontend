'use client';

import { useQuery } from '@tanstack/react-query';
import { getFriendRequestsCount } from '../api/get';
import { type UseRequestsParams } from '../types';

const useRequestCount = ({ direction, search }: UseRequestsParams) => {
	return useQuery({
		queryKey: ['friend-requests', direction, search, 'count'],
		queryFn: () => getFriendRequestsCount({ direction, search }),
	});
};

export { useRequestCount };
