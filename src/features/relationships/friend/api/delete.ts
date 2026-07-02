import { api, isApiError } from '@/libs/api';
import { FRIEND_ENDPOINTS } from '../constants/endpoints';

const deleteFriend = async (friendId: string) => {
	const response = await api.delete<void>(
		`${FRIEND_ENDPOINTS.deleteFriend}/${friendId}`,
	);
	if (isApiError(response)) {
		throw new Error('Failed to delete friend');
	}
};

export { deleteFriend };
