import { api, buildUrlParams, isApiError } from '@/libs/api';
import { FRIEND_REQUEST_ENDPOINTS } from '../constants/endpoints';
import { GetFriendRequests, GetFriendRequestsParams } from '../types';

const getFriendRequests = async (params: GetFriendRequestsParams) => {
	const urlParams = buildUrlParams(params);
	urlParams.append('direction', params.direction);

	const res = await api.get<GetFriendRequests>(
		`${FRIEND_REQUEST_ENDPOINTS.getfriendRequests}?${urlParams.toString()}`,
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
		`${FRIEND_REQUEST_ENDPOINTS.getfriendRequestsCount}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export { getFriendRequests, getFriendRequestsCount };
