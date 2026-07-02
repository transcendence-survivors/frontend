import { api, isApiError } from '@libs/api';
import { FRIENDS_ENDPOINTS } from '../constants/endpoints';

const acceptFriendRequest = async (friendId: string) => {
	await new Promise((resolve) => setTimeout(resolve, 100000));
	const res = await api.patch(`${FRIENDS_ENDPOINTS.acceptFriendRequest}/${friendId}`);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res;
};

export { acceptFriendRequest };
