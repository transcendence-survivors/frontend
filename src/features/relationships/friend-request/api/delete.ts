import { api, isApiError } from '@/libs/api';
import { FRIEND_REQUEST_ENDPOINTS } from '../constants/endpoints';

const deleteFriendRequest = async (friendId: string) => {
	const response = await api.delete<void>(
		`${FRIEND_REQUEST_ENDPOINTS.deleteFriendRequest}/${friendId}`,
	);
	if (isApiError(response)) {
		throw new Error('Failed to delete friend request');
	}
};

export { deleteFriendRequest };
