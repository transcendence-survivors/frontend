import { env } from '@env';
import { ApiResponse } from './types';
import { useSessionStore } from '@auth/stores/session';
import { TOKEN_PREFIX } from '@auth/constants/cookies';
import { refreshAccessToken } from '@auth/api/auth';

const API_URL = env.NEXT_PUBLIC_API_URL;

type FetchOptions = RequestInit & {
	_retry?: boolean;
};

const buildUrl = (path: string) =>
	`${API_URL}${path.startsWith('/') ? path : `/${path}`}`;

const baseFetch = (path: string, init: FetchOptions = {}) => {
	return fetch(buildUrl(path), {
		...init,
		headers: {
			...init.headers,
		},
		credentials: 'include',
	});
};

export const request = async <T>(
	path: string,
	init: FetchOptions = {},
): Promise<ApiResponse<T>> => {
	const store = useSessionStore.getState();

	let res = await baseFetch(path, init);

	if (res.status === 401 && !init._retry) {
		try {
			await refreshAccessToken();

			res = await baseFetch(path, {
				...init,
				_retry: true,
				headers: {
					...init.headers,
				},
			});
		} catch {
			store.logout();
			throw new Error('unauthorized');
		}
	}

	return (await res.json()) as ApiResponse<T>;
};
