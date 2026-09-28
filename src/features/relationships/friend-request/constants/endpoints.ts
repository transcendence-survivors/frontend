import { Endpoint } from '@/libs/api';

const FRIEND_REQUEST_START_PATH = '/friends/requests' as const;

type StartPath = typeof FRIEND_REQUEST_START_PATH;

const FRIEND_REQUEST_ENDPOINTS = {
	getfriendRequests: `${FRIEND_REQUEST_START_PATH}`,
	getfriendRequestsCount: `${FRIEND_REQUEST_START_PATH}/count`,
	acceptFriendRequest: (friendId: string) => `${FRIEND_REQUEST_START_PATH}/${friendId}`,
	deleteFriendRequest: (friendId: string) => `${FRIEND_REQUEST_START_PATH}/${friendId}`,
	sendFriendRequest: `${FRIEND_REQUEST_START_PATH}`,
} as const satisfies Record<string, Endpoint<StartPath>>;

export { FRIEND_REQUEST_ENDPOINTS };
