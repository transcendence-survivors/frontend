import { api, buildUrlParams, CursorResponse, isApiError } from '@/libs/api';
import { CHAT_ENDPOINTS } from '../constants/endpoints';
import { ChatRoom, GetChatRoomSearchParams } from '../types';

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

export { getChatRooms };
