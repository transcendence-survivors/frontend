const FRIENDS_START_PATH = '/friends' as const;

type StartPath = typeof FRIENDS_START_PATH;
type FriendsEndpoint = `${StartPath}/${string}` | `${StartPath}`;

const FRIEND_ENDPOINTS = {
	getfriends: `${FRIENDS_START_PATH}`,
	getfriendsCount: `${FRIENDS_START_PATH}/count`,
	getfriendsIds: `${FRIENDS_START_PATH}/ids`,
	getfriendsIdsCount: `${FRIENDS_START_PATH}/ids/count`,
	deleteFriend: `${FRIENDS_START_PATH}`,
} as const satisfies Record<string, FriendsEndpoint>;

export { FRIEND_ENDPOINTS };
