import { api, buildUrlParams, isApiError } from '@/libs/api';
import type { GetFriendIdsParams, GetFriendsParams, GetFriendsResponse } from '../types';
import { FRIEND_ENDPOINTS } from '../constants/endpoints';

const getFriends = async (params: GetFriendsParams) => {
	const urlParams = buildUrlParams(params);
	const res = await api.get<GetFriendsResponse>(
		`${FRIEND_ENDPOINTS.getfriends}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

const getFriendsFromIds = async ({
	friendIds,
	status,
	...params
}: GetFriendIdsParams) => {
	if (status === 'all') return getFriends({ ...params });

	const res = await api.post<GetFriendsResponse>(FRIEND_ENDPOINTS.getfriendsIds, {
		friendIds,
		status: status === 'online' ? 'IN' : 'NOT_IN',
		...params,
	});
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export { getFriendsFromIds };
