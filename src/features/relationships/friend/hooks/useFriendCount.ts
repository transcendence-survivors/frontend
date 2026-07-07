'use client';

import { useQuery } from '@tanstack/react-query';
import { getFriendsIdsCount } from '../api/count';
import { GetFriendIdsCountParams } from '../types';

type UseFriendsCountParams = Omit<GetFriendIdsCountParams, 'cursor' | 'limit'>;

const useFriendsCount = (params: UseFriendsCountParams) => {
	return useQuery({
		queryKey: ['friends', params, 'count'],
		queryFn: () => getFriendsIdsCount(params),
	});
};

export { useFriendsCount };
export type { UseFriendsCountParams };
