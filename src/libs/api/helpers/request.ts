import { ApiResponse, ApiError, ApiSuccess } from './types';

const API_URL = '/api';

export type FetchOptions = RequestInit & {
	no_retry?: boolean;
};

const buildUrl = (path: string) =>
	`${API_URL}${path.startsWith('/') ? path : `/${path}`}`;

const baseFetch = (path: string, init: RequestInit) => {
	const url = buildUrl(path);

	return fetch(url, {
		...init,
		headers: {
			...init.headers,
		},
		credentials: 'include',
	});
};

const refreshAccessToken = async () => {
	const res = await baseFetch('/auth/refresh', {
		method: 'POST',
	});
	if (!res.ok) {
		throw new Error('Failed to refresh access token');
	}
};

export const request = async <T>(
	path: string,
	init: FetchOptions = { no_retry: false },
): Promise<ApiResponse<T>> => {
	let res = await baseFetch(path, init);

	if (res.status === 401 && !init.no_retry) {
		try {
			await refreshAccessToken();
			res = await baseFetch(path, init);
		} catch {
			throw new Error('unauthorized');
		}
	}
	if (!res.ok) {
		return {
			status: 'error',
			code: res.status,
			message: res.statusText,
		} satisfies ApiError;
	}
	if (res.status === 204) {
		return {
			status: 'success',
			message: 'No Content',
			data: null as unknown as T,
		} satisfies ApiSuccess<T>;
	}
	return (await res.json()) as ApiResponse<T>;
};
