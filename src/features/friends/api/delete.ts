import { api, isApiError } from '@/libs/api';
import { FRIENDS_ENDPOINTS } from '../constants/endpoints';

const deleteFriendRequest = async (friendId: string) => {
	const response = await api.delete<void>(
		`${FRIENDS_ENDPOINTS.deleteFriendRequest}/${friendId}`,
	);
	if (isApiError(response)) {
		throw new Error('Failed to delete friend request');
	}
};

const deleteFriend = async (friendId: string) => {
	const response = await api.delete<void>(
		`${FRIENDS_ENDPOINTS.deleteFriend}/${friendId}`,
	);
	if (isApiError(response)) {
		throw new Error('Failed to delete friend');
	}
};

export { deleteFriendRequest, deleteFriend };
