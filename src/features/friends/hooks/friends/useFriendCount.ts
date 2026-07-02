'use client';

import { useQuery } from '@tanstack/react-query';
import {
	FriendStatus,
	getFriendsIdsCount,
	GetFriendsParams,
} from '../../api/get-friends';

type UseFriendsCountParams = Pick<GetFriendsParams, 'search'> & {
	status: FriendStatus;
	friendIds: string[];
};

const useFriendsCount = ({ search, status, friendIds }: UseFriendsCountParams) => {
	return useQuery({
		queryKey: ['friends', { search, status, friendIds }, 'count'],
		queryFn: () => getFriendsIdsCount({ search, status, friendIds }),
	});
};

export { useFriendsCount };
