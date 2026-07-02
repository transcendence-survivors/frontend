import { api, buildUrlParams, isApiError } from '@/libs/api';
import { FRIENDS_ENDPOINTS } from '../constants/endpoints';
import { CursorParams, CursorResponse } from '@/libs/api/helpers/types';
import { FriendRequest } from '../types';

type FriendRequestDirection = 'incoming' | 'outgoing';
type GetFriendRequestsParams = {
	direction: FriendRequestDirection;
} & CursorParams<'createdAsc' | 'createdDesc'>;

type GetFriendRequests = CursorResponse<FriendRequest[]>;

const getFriendRequests = async (params: GetFriendRequestsParams) => {
	const urlParams = buildUrlParams(params);
	urlParams.append('direction', params.direction);

	const res = await api.get<GetFriendRequests>(
		`${FRIENDS_ENDPOINTS.getfriendRequests}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

const getFriendRequestsCount = async (
	params: Pick<GetFriendRequestsParams, 'search' | 'direction'>,
) => {
	const urlParams = buildUrlParams(params);
	urlParams.append('direction', params.direction);

	const res = await api.get<{ count: number }>(
		`${FRIENDS_ENDPOINTS.getfriendRequestsCount}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export { getFriendRequests, getFriendRequestsCount };
export type { GetFriendRequestsParams, GetFriendRequests, FriendRequestDirection };
