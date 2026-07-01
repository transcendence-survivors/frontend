import { api, isApiError } from '@/libs/api';
import { FRIENDS_ENDPOINTS } from '../constants/endpoints';
import { CursorParams, CursorResponse } from '@/libs/api/helpers/types';
import { FriendRequest } from '../types';

export type FriendRequestDirection = 'incoming' | 'outgoing';

type GetCursorFriendParams = CursorParams<'createdAsc' | 'createdDesc'>;

const buildUrlParams = (params: GetCursorFriendParams) => {
	const urlParams = new URLSearchParams();
	if (params.limit) urlParams.append('limit', params.limit.toString());
	if (params.search) urlParams.append('search', params.search);
	if (params.cursor) urlParams.append('cursor', params.cursor);
	if (params.orderBy) urlParams.append('orderBy', params.orderBy);
	return urlParams;
};

// const getFriends = async ({ page, limit, search, orderBy }: GetFriendsParams) => {
// 	const urlParams = buildUrlParams({ page, limit, search, orderBy });
// 	const res = await api.get<PaginationResponse<Friend[]>>(
// 		`${FRIENDS_ENDPOINTS.getfriends}?${urlParams.toString()}`,
// 	);
// 	if (isApiError(res)) {
// 		throw new Error(res.message);
// 	}
// 	return res.data;
// };

// const getFriendsIds = async (body: GetFriendsIdsBody) => {
// 	const res = await api.post<PaginationResponse<Friend[]>>(
// 		`${FRIENDS_ENDPOINTS.getfriendsIds}`,
// 		{ body },
// 	);
// 	if (isApiError(res)) {
// 		throw new Error(res.message);
// 	}
// 	return res.data;
// };

export type GetFriendRequestsParams = GetCursorFriendParams & {
	direction: FriendRequestDirection;
};

export type GetFriendRequests = CursorResponse<FriendRequest[]>;
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
