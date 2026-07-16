import { api } from '@/libs/api';
import { CHAT_ENDPOINTS } from '../constants/endpoints';

const deleteRoom = async (roomId: string) => {
	return await api.delete<void>(CHAT_ENDPOINTS.deleteRoom(roomId));
};

export { deleteRoom };
