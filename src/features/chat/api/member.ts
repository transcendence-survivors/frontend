import { api, buildUrlParams, isApiError } from '@/libs/api';
import { CHAT_ENDPOINTS } from '../constants/endpoints';
import {
	GetChatMembersCountParams,
	GetChatMembersParams,
	GetChatMembersResponse,
} from '../types/member';

export const getChatMembers = async (
	roomId: string,
	params: GetChatMembersParams,
): Promise<GetChatMembersResponse> => {
	const urlParams = buildUrlParams(params);
	const res = await api.get<GetChatMembersResponse>(
		`${CHAT_ENDPOINTS.getMembers(roomId)}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export const getChatMembersCount = async (
	roomId: string,
	params?: GetChatMembersCountParams,
): Promise<{ count: number }> => {
	const urlParams = buildUrlParams(params || {});
	const res = await api.get<{ count: number }>(
		`${CHAT_ENDPOINTS.getMembersCount(roomId)}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};
