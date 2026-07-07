import { api, buildUrlParams, isApiError } from '@/libs/api';
import type {
	GetFriendIdsCountParams,
	GetFriendsCountParams,
	GetFriendsCountResponse,
} from '../types';
import { FRIEND_ENDPOINTS } from '../constants/endpoints';

const getFriendsCount = async (params: GetFriendsCountParams) => {
	const urlParams = buildUrlParams(params);
	const res = await api.get<GetFriendsCountResponse>(
		`${FRIEND_ENDPOINTS.getfriendsCount}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

const getFriendsIdsCount = async ({
	friendIds,
	status,
	...params
}: GetFriendIdsCountParams) => {
	if (status === 'all') {
		return getFriendsCount({ ...params });
	}
	const res = await api.post<GetFriendsCountResponse>(
		FRIEND_ENDPOINTS.getfriendsIdsCount,
		{
			friendIds,
			status: status === 'online' ? 'IN' : 'NOT_IN',
			...params,
		},
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export { getFriendsIdsCount };
