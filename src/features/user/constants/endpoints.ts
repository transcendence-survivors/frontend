const USER_START_PATH = '/users' as const;
const USER_FEED_START_PATH = `${USER_START_PATH}/feed` as const;

type StartPath = typeof USER_START_PATH | typeof USER_FEED_START_PATH;
type UsersEndpoint = `${StartPath}/${string}` | `${StartPath}`;

const USERS_ENDPOINTS = {
	getProfileByUsername: `${USER_START_PATH}/profile/:username`,

	getUsers: `${USER_START_PATH}`,
	getUsersCount: `${USER_START_PATH}/count`,

	feedGetUsers: `${USER_FEED_START_PATH}`,
	feedGetUsersCount: `${USER_FEED_START_PATH}/count`,
} as const satisfies Record<string, UsersEndpoint>;

export { USERS_ENDPOINTS };
