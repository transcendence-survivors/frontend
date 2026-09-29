import { api, buildUrlParams, isApiError } from '@/libs/api';
import type {
	GetFriendIdsCountParams,
	GetFriendIdsParams,
	GetFriendsCountParams,
	GetFriendsCountResponse,
	GetFriendsParams,
	GetFriendsResponse,
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

export const getFriendsIdsCount = async ({
	friendIds,
	status,
	...params
}: GetFriendIdsCountParams) => {
	if (status === 'ALL') {
		return getFriendsCount({ ...params });
	}
	const res = await api.post<GetFriendsCountResponse>(
		FRIEND_ENDPOINTS.getfriendsIdsCount,
		{
			friendIds,
			status,
			...params,
		},
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

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

export const getFriendsFromIds = async ({
	friendIds,
	status,
	...params
}: GetFriendIdsParams) => {
	if (status === 'ALL') return getFriends({ ...params });

	const res = await api.post<GetFriendsResponse>(FRIEND_ENDPOINTS.getfriendsIds, {
		friendIds,
		status,
		...params,
	});
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export const deleteFriend = async (friendId: string) => {
	const response = await api.delete<void>(FRIEND_ENDPOINTS.deleteFriend(friendId));
	if (isApiError(response)) {
		throw new Error('Failed to delete friend');
	}
};
