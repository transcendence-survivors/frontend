'use client';

import { useQuery } from '@tanstack/react-query';
import { getFriendRequestsCount } from '../api/get';
import { type UseRequestsParams } from './useRequest';

const useRequestCount = ({ direction, search }: UseRequestsParams) => {
	return useQuery({
		queryKey: ['friends', 'requests', direction, search, 'count'],
		queryFn: () => getFriendRequestsCount({ direction, search }),
	});
};

export { useRequestCount };
