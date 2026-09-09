import { api, buildUrlParams, isApiError } from '@/libs/api';
import { CHAT_ENDPOINTS } from '../constants/endpoints';
import {
	ChatMemberRole,
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

export const kickChatMember = async (
	roomId: string,
	targetUserId: string,
): Promise<void> => {
	const res = await api.delete<void>(CHAT_ENDPOINTS.kickMember(roomId, targetUserId));
	if (isApiError(res)) {
		throw new Error(res.message);
	}
};

export const updateChatMemberRole = async (
	roomId: string,
	targetUserId: string,
	role: ChatMemberRole,
): Promise<void> => {
	const res = await api.patch<void>(
		CHAT_ENDPOINTS.updateMemberRole(roomId, targetUserId),
		{ role },
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
};

export const transferChatRoomOwnership = async (
	roomId: string,
	targetUserId: string,
): Promise<void> => {
	const res = await api.post<void>(CHAT_ENDPOINTS.transferOwnership(roomId), {
		targetUserId,
	});
	if (isApiError(res)) {
		throw new Error(res.message);
	}
};

export const leaveChatRoom = async (roomId: string): Promise<void> => {
	const res = await api.post<void>(CHAT_ENDPOINTS.leaveRoom(roomId));
	if (isApiError(res)) {
		throw new Error(res.message);
	}
};
