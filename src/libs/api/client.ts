import { ApiResponse, ApiError, ApiSuccess } from './types';
import { useSessionStore } from '@auth/stores/session';
import { refreshAccessToken } from '@/features/auth/api/refresh';
import { ApiRequestInit } from './api';

const API_URL = '/api';

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
		return {
			status: 'success',
			message: 'No Content',
			data: null as unknown as T,
		} satisfies ApiSuccess<T>;
	}
	if (!res.ok) {
		return {
			status: 'error',
			code: res.status,
			message: res.statusText,
		} satisfies ApiError;
	}
	return (await res.json()) as ApiResponse<T>;
};
