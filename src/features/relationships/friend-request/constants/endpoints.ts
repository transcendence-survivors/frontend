const FRIEND_REQUEST_START_PATH = '/friends/requests' as const;

type StartPath = typeof FRIEND_REQUEST_START_PATH;
type FriendsEndpoint = `${StartPath}/${string}` | `${StartPath}`;

const FRIEND_REQUEST_ENDPOINTS = {
	getfriendRequests: `${FRIEND_REQUEST_START_PATH}`,
	getfriendRequestsCount: `${FRIEND_REQUEST_START_PATH}/count`,
	acceptFriendRequest: `${FRIEND_REQUEST_START_PATH}`,
	deleteFriendRequest: `${FRIEND_REQUEST_START_PATH}`,
	sendFriendRequest: `${FRIEND_REQUEST_START_PATH}`,
} as const satisfies Record<string, FriendsEndpoint>;

export { FRIEND_REQUEST_ENDPOINTS };
