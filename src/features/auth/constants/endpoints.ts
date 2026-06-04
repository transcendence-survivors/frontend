const AUTH_START_PATH = '/auth' as const;

type AuthEndpoint = `${typeof AUTH_START_PATH}/${string}`;

const AUTH_ENDPOINTS = {
	signUp: `${AUTH_START_PATH}/register`,
	login: `${AUTH_START_PATH}/login`,
	logout: `${AUTH_START_PATH}/logout`,
	refresh: `${AUTH_START_PATH}/refresh`,
	me: `${AUTH_START_PATH}/me`,
} as const satisfies Record<string, AuthEndpoint>;

export { AUTH_ENDPOINTS, AUTH_START_PATH };
