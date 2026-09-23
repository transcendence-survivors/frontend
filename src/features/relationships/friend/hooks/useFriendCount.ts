'use client';

import { useQuery } from '@tanstack/react-query';
import { getFriendsIdsCount } from '../api/count';
import { GetFriendIdsCountParams } from '../types';

export type UseFriendsCountParams = Omit<GetFriendIdsCountParams, 'cursor' | 'limit'>;

export const useFriendsCount = (params: UseFriendsCountParams) => {
	return useQuery({
		queryKey: ['friends-count', params],
		queryFn: () => getFriendsIdsCount(params),
	});
};
