import { api, ApiError, buildUrlParams, CursorResponse, isApiError } from '@/libs/api';
import { CHAT_ENDPOINTS } from '../constants/endpoints';
import { ChatRoom, GetChatRoomSearchParams } from '../types/room';
import { GetChatMessagesParams, GetChatMessagesResponse } from '../types/message';

type GetChatRooms = CursorResponse<ChatRoom[]>;

const getChatRooms = async (params: GetChatRoomSearchParams) => {
	const urlParams = buildUrlParams(params);
	if (params.type) urlParams.append('type', params.type);

	const response = await api.get<GetChatRooms>(
		`${CHAT_ENDPOINTS.getRooms}?${urlParams}`,
	);
	if (isApiError(response))
		throw new Error(`Failed to fetch chat rooms: ${response.message}`);
	return response.data;
};

const getChatRoom = async (id: string, cookie: string) => {
	try {
		return await api.get<ChatRoom>(CHAT_ENDPOINTS.getRoom(id), {
			headers: {
				Cookie: cookie,
			},
		});
	} catch {
		return {
			status: 'error',
			message: 'Failed to fetch chat room',
			code: 500,
		} satisfies ApiError;
	}
};

const getChatMessages = async (roomId: string, params: GetChatMessagesParams) => {
	const urlParams = buildUrlParams(params);
	const res = await api.get<GetChatMessagesResponse>(
		`${CHAT_ENDPOINTS.getMessages(roomId)}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export { getChatRooms, getChatRoom, getChatMessages };
