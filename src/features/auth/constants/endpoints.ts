const AUTH_START_PATH = '/auth' as const;
const USER_START_PATH = '/users' as const;

type StartPath = typeof AUTH_START_PATH | typeof USER_START_PATH;
type AuthEndpoint = `${StartPath}/${string}`;

const AUTH_ENDPOINTS = {
	signUp: `${AUTH_START_PATH}/register`,
	login: `${AUTH_START_PATH}/login`,
	logout: `${AUTH_START_PATH}/logout`,
	refresh: `${AUTH_START_PATH}/refresh`,
	me: `${AUTH_START_PATH}/me`,

	checkEmail: `${USER_START_PATH}/check-email`,
	checkUsername: `${USER_START_PATH}/check-username`,
} as const satisfies Record<string, AuthEndpoint>;

export { AUTH_ENDPOINTS, AUTH_START_PATH };
