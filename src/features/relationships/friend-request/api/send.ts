import { api, isApiError } from '@libs/api';
import { FRIEND_REQUEST_ENDPOINTS } from '../constants/endpoints';
import { SendFriendRequest } from '../types';

const sendFriendRequest = async (friendId: string) => {
	const res = await api.post<SendFriendRequest>(
		`${FRIEND_REQUEST_ENDPOINTS.sendFriendRequest}`,
		{
			friendId,
		},
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res;
};

export { sendFriendRequest };
