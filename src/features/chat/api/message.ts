import { api, buildUrlParams, isApiError } from '@/libs/api';
import { CHAT_ENDPOINTS } from '../constants/endpoints';
import { GetChatMessagesParams, GetChatMessagesResponse } from '../types/message';

export const getChatMessages = async (roomId: string, params: GetChatMessagesParams) => {
	const urlParams = buildUrlParams(params);
	const res = await api.get<GetChatMessagesResponse>(
		`${CHAT_ENDPOINTS.getMessages(roomId)}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export interface SharePostPayload {
	postId: string;
	roomIds: string[];
	comment?: string;
}

interface SharePostResponse {
	postId: string;
	successfulRoomIds: string[];
	failedRoomIds: string[];
}

export async function sharePostRequest(payload: SharePostPayload) {
	const res = await api.post<SharePostResponse>(CHAT_ENDPOINTS.sharePost, payload);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
}
