import { api, isApiError } from '@/libs/api';
import { FRIENDS_ENDPOINTS } from '../constants/endpoints';
import {
	BaseCursorPaginationParams,
	CursorPaginationResponse,
} from '@/libs/api/helpers/types';
import { FriendRequest } from '../types';

export type FriendRequestDirection = 'incoming' | 'outgoing';

type GetCursorFriendParams = BaseCursorPaginationParams<'createdAsc' | 'createdDesc'>;
export type GetFriendRequestsParams = GetCursorFriendParams & {
	direction: FriendRequestDirection;
};

const buildUrlParams = (params: Omit<GetCursorFriendParams, 'cursor'>) => {
	const urlParams = new URLSearchParams();
	if (params.limit) urlParams.append('limit', params.limit.toString());
	if (params.search) urlParams.append('search', params.search);
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

export type GetFriendRequests = CursorPaginationResponse<FriendRequest[]>;
const getFriendRequests = async (params: GetFriendRequestsParams) => {
	const urlParams = buildUrlParams(params);
	urlParams.append('direction', params.direction);
	if (params.cursor) urlParams.append('cursor', params.cursor);

	const res = await api.get<GetFriendRequests>(
		`${FRIENDS_ENDPOINTS.getfriendRequests}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

type GetFriendRequestsCountParams = {
	search?: string;
	direction: FriendRequestDirection;
};
const getFriendRequestsCount = async (params: GetFriendRequestsCountParams) => {
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
