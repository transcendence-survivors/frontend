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
