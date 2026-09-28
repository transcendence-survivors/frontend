import { api, buildUrlParams, isApiError } from '@libs/api';
import { FRIEND_REQUEST_ENDPOINTS } from '../constants/endpoints';
import { GetFriendRequests, GetFriendRequestsParams, SendFriendRequest } from '../types';

export const getFriendRequests = async (params: GetFriendRequestsParams) => {
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

export const getFriendRequestsCount = async (
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

export const acceptFriendRequest = async (friendId: string) => {
	const res = await api.patch<void>(
		FRIEND_REQUEST_ENDPOINTS.acceptFriendRequest(friendId),
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res;
};

export const sendFriendRequest = async (friendId: string) => {
	const res = await api.post<SendFriendRequest>(
		FRIEND_REQUEST_ENDPOINTS.sendFriendRequest,
		{
			friendId,
		},
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res;
};

export const deleteFriendRequest = async (friendId: string) => {
	const response = await api.delete<void>(
		FRIEND_REQUEST_ENDPOINTS.deleteFriendRequest(friendId),
	);
	if (isApiError(response)) {
		throw new Error('Failed to delete friend request');
	}
};
