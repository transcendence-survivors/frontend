import { api } from '@/libs/api';
import { CHAT_ENDPOINTS } from '../constants/endpoints';
import { ChatRoom, ChatRoomType } from '../types';

interface ChatRoomCreatePayload {
	type: ChatRoomType;
	name?: string;
	usersIds: string[];
}

const createChatRoom = async (payload: ChatRoomCreatePayload) => {
	return await api.post<ChatRoom>(CHAT_ENDPOINTS.createRoom, payload);
};

export { createChatRoom };
