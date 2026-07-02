const FRIENDS_START_PATH = '/friends' as const;
const FRIEND_REQUEST_START_PATH = '/friends/requests' as const;

type StartPath = typeof FRIENDS_START_PATH | typeof FRIEND_REQUEST_START_PATH;
type FriendsEndpoint = `${StartPath}/${string}` | `${StartPath}`;

const FRIENDS_ENDPOINTS = {
	getfriends: `${FRIENDS_START_PATH}`,
	getfriendsCount: `${FRIENDS_START_PATH}/count`,

	getfriendsIds: `${FRIENDS_START_PATH}/ids`,
	getfriendsIdsCount: `${FRIENDS_START_PATH}/ids/count`,

	getfriendRequests: `${FRIEND_REQUEST_START_PATH}`,
	getfriendRequestsCount: `${FRIEND_REQUEST_START_PATH}/count`,

	acceptFriendRequest: `${FRIEND_REQUEST_START_PATH}`,
	deleteFriendRequest: `${FRIEND_REQUEST_START_PATH}`,

	sendFriendRequest: `${FRIEND_REQUEST_START_PATH}`,
	deleteFriend: `${FRIENDS_START_PATH}`,
} as const satisfies Record<string, FriendsEndpoint>;

export { FRIENDS_ENDPOINTS };
