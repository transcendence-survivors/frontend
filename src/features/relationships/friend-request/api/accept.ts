import { api, isApiError } from '@libs/api';
import { FRIEND_REQUEST_ENDPOINTS } from '../constants/endpoints';

const acceptFriendRequest = async (friendId: string) => {
	const res = await api.patch(
		`${FRIEND_REQUEST_ENDPOINTS.acceptFriendRequest}/${friendId}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res;
};

export { acceptFriendRequest };
