import { Endpoint } from '@/libs/api';

const FRIENDS_START_PATH = '/friends' as const;
type StartPath = typeof FRIENDS_START_PATH;

const FRIEND_ENDPOINTS = {
	getfriends: `${FRIENDS_START_PATH}`,
	getfriendsCount: `${FRIENDS_START_PATH}/count`,
	getfriendsIds: `${FRIENDS_START_PATH}/ids`,
	getfriendsIdsCount: `${FRIENDS_START_PATH}/ids/count`,
	deleteFriend: (friendId: string) => `${FRIENDS_START_PATH}/${friendId}`,
} as const satisfies Record<string, Endpoint<StartPath>>;

export { FRIEND_ENDPOINTS };
