'use client';

import { useQuery } from '@tanstack/react-query';
import { getFriendRequestsCount } from '../api/friend-request';
import { type UseRequestsParams } from '../types';

export const useRequestCount = ({ direction, search }: UseRequestsParams) => {
	return useQuery({
		queryKey: ['friend-requests-count', direction, search],
		queryFn: () => getFriendRequestsCount({ direction, search }),
	});
};
