const USER_START_PATH = '/users' as const;

type StartPath = typeof USER_START_PATH;
type UsersEndpoint = `${StartPath}/${string}` | `${StartPath}`;

const USERS_ENDPOINTS = {
	getUserByUsername: `${USER_START_PATH}/:username`,
} as const satisfies Record<string, UsersEndpoint>;

export { USERS_ENDPOINTS };
