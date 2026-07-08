import { api, isApiError } from '@/libs/api';
import { BLOCK_ENDPOINTS } from '../constants/endpoints';
import { BlockAdd } from '../types';

const addBlock = async (blockedId: string) => {
	const response = await api.post<BlockAdd>(`${BLOCK_ENDPOINTS.addBlock}`, {
		blockedId,
	});
	if (isApiError(response)) {
		throw new Error('Failed to delete block');
	}
};

export { addBlock };
