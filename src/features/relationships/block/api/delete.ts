import { api, isApiError } from '@/libs/api';
import { BLOCK_ENDPOINTS } from '../constants/endpoints';

const deleteBlock = async (friendId: string) => {
	const response = await api.delete<void>(`${BLOCK_ENDPOINTS.deleteBlock}/${friendId}`);
	if (isApiError(response)) {
		throw new Error('Failed to delete block');
	}
};

export { deleteBlock };
