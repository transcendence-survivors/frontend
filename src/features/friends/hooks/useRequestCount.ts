'use client';

import { useQuery } from '@tanstack/react-query';
import { type FriendRequestDirection, getFriendRequestsCount } from '../api/get';
import { useQueryState } from 'nuqs';

interface GetFriendRequestsCountParams {
	direction: FriendRequestDirection;
}

const useRequestCount = ({ direction }: GetFriendRequestsCountParams) => {
	const [search] = useQueryState('search', { defaultValue: '' });

	return useQuery({
		queryKey: ['friends', 'requests', direction, search, 'count'],
		queryFn: () => getFriendRequestsCount({ direction, search }),
	});
};

export { useRequestCount };
