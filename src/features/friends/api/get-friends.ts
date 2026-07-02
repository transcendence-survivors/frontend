import { api, buildUrlParams, isApiError } from '@/libs/api';
import { Friend } from '../types';
import { CursorParams, CursorResponse } from '@/libs/api/helpers/types';
import { FRIENDS_ENDPOINTS } from '../constants/endpoints';

type GetFriendsParams = CursorParams<
	'createdAsc' | 'createdDesc' | 'userNameAsc' | 'userNameDesc'
>;
type GetFriends = CursorResponse<Friend[]>;
export type FriendStatus = 'all' | 'online' | 'offline';
export type IdsParams = {
	friendIds: string[];
	status: FriendStatus;
};

const getFriends = async (params: GetFriendsParams) => {
	const urlParams = buildUrlParams(params);
	const res = await api.get<GetFriends>(
		`${FRIENDS_ENDPOINTS.getfriends}?${urlParams.toString()}`,
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
}: GetFriendsParams & IdsParams) => {
	if (status === 'all') {
		return getFriends({ ...params });
	}

	const res = await api.post<GetFriends>(FRIENDS_ENDPOINTS.getfriendsIds, {
		friendIds,
		status: status === 'online' ? 'IN' : 'NOT_IN',
		...params,
	});
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

const getFriendsCount = async (params: Pick<GetFriendsParams, 'search'>) => {
	const urlParams = buildUrlParams(params);
	const res = await api.get<{ count: number }>(
		`${FRIENDS_ENDPOINTS.getfriendsCount}?${urlParams.toString()}`,
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
}: Pick<GetFriendsParams, 'search'> & IdsParams) => {
	if (status === 'all') {
		return getFriendsCount({ ...params });
	}
	const res = await api.post<{ count: number }>(FRIENDS_ENDPOINTS.getfriendsIdsCount, {
		friendIds,
		status: status === 'online' ? 'IN' : 'NOT_IN',
		...params,
	});
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export { getFriendsFromIds, getFriendsIdsCount };
export type { GetFriendsParams, GetFriends };
