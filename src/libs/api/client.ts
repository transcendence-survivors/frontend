import { useSessionStore } from '@/libs/stores/session';
import { refreshAccessToken } from '@/libs/api/auth';
import { ApiResponse } from '@/libs/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type FetchOptions = RequestInit & {
	_retry?: boolean;
};

const buildUrl = (path: string) =>
	`${API_URL}${path.startsWith('/') ? path : `/${path}`}`;

const baseFetch = (path: string, init: FetchOptions = {}) => {
	const store = useSessionStore.getState();

	return fetch(buildUrl(path), {
		...init,
		headers: {
			...init.headers,
			Authorization: store.accessToken ? `Bearer ${store.accessToken}` : '',
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
			const rotated = await refreshAccessToken();

			store.setAccessToken(rotated.accessToken);

			res = await baseFetch(path, {
				...init,
				_retry: true,
				headers: {
					...init.headers,
					Authorization: `Bearer ${rotated.accessToken}`,
				},
			});
		} catch {
			store.logout();
			throw new Error('unauthorized');
		}
	}

	const json = (await res.json()) as ApiResponse<T>;

	return json;
};
