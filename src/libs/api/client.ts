import { env } from '@env';
import { ApiResponse } from './types';
import { useSessionStore } from '@auth/stores/session';
import { refreshAccessToken } from '@/features/auth/api/refresh';
import { ApiRequestInit } from './api';

const API_URL = env.NEXT_PUBLIC_API_URL.endsWith('/')
	? env.NEXT_PUBLIC_API_URL.slice(0, -1)
	: env.NEXT_PUBLIC_API_URL;

type FetchOptions = ApiRequestInit & {
	_retry?: boolean;
};

const buildUrl = (path: string) =>
	`${API_URL}${path.startsWith('/') ? path : `/${path}`}`;

const baseFetch = (path: string, init: FetchOptions = {}) => {
	const url = buildUrl(path);
	return fetch(url, {
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
	if (res.status === 204) {
		return { status: 'success' } as ApiResponse<T>;
	}
	return (await res.json()) as ApiResponse<T>;
};
