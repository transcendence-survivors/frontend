import { api, isApiError } from '@/libs/api';
import { FRIENDS_ENDPOINTS } from '../constants/endpoints';
import {
	BaseCursorPaginationParams,
	BasePaginationParams,
	CursorPaginationResponse,
	PaginationResponse,
} from '@/libs/api/helpers/types';
import { Friend, FriendRequest } from '../types';

type GetFriendsParams = BasePaginationParams<'createdAsc' | 'createdDesc'>;
type GetCursorFriendParams = BaseCursorPaginationParams<'createdAsc' | 'createdDesc'>;

type GetFriendsIdsBody = GetFriendsParams & {
	friendIds: string[];
	status: 'IN' | 'NOT_IN';
};
export type GetFriendRequestsParams = GetCursorFriendParams & {
	direction: 'incoming' | 'outgoing';
};

const buildUrlParams = (params: GetFriendsParams) => {
	const urlParams = new URLSearchParams();
	if (params.page) urlParams.append('page', params.page.toString());
	if (params.limit) urlParams.append('limit', params.limit.toString());
	if (params.search) urlParams.append('search', params.search);
	if (params.orderBy) urlParams.append('orderBy', params.orderBy);
	return urlParams;
};

const getFriends = async ({ page, limit, search, orderBy }: GetFriendsParams) => {
	const urlParams = buildUrlParams({ page, limit, search, orderBy });
	const res = await api.get<PaginationResponse<Friend[]>>(
		`${FRIENDS_ENDPOINTS.getfriends}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

const getFriendsIds = async (body: GetFriendsIdsBody) => {
	const res = await api.post<PaginationResponse<Friend[]>>(
		`${FRIENDS_ENDPOINTS.getfriendsIds}`,
		{ body },
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

const getFriendRequests = async (params: GetFriendRequestsParams) => {
	const urlParams = buildUrlParams(params);
	urlParams.append('direction', params.direction);
	if (params.cursor) urlParams.append('cursor', params.cursor);

	const res = await api.get<CursorPaginationResponse<FriendRequest[]>>(
		`${FRIENDS_ENDPOINTS.getfriendRequests}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export { getFriends, getFriendsIds, getFriendRequests };
