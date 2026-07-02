import { FetchOptions, request } from './helpers/request';
import { CursorParams } from './helpers/types';

export const api = {
	get: <T>(path: string, init?: FetchOptions) =>
		request<T>(path, { ...init, method: 'GET' }),

	post: <T>(path: string, body?: unknown, init?: FetchOptions) =>
		request<T>(path, {
			...init,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...init?.headers,
			},
			body: body ? JSON.stringify(body) : undefined,
		}),

	put: <T>(path: string, body?: unknown, init?: FetchOptions) =>
		request<T>(path, {
			...init,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				...init?.headers,
			},
			body: body ? JSON.stringify(body) : undefined,
		}),

	patch: <T>(path: string, body?: unknown, init?: FetchOptions) =>
		request<T>(path, {
			...init,
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				...init?.headers,
			},
			body: body ? JSON.stringify(body) : undefined,
		}),

	delete: <T>(path: string, init?: FetchOptions) =>
		request<T>(path, { ...init, method: 'DELETE' }),
};

export const buildUrlParams = <T extends string>(params: CursorParams<T>) => {
	const urlParams = new URLSearchParams();
	if (params.limit) urlParams.append('limit', params.limit.toString());
	if (params.search) urlParams.append('search', params.search);
	if (params.cursor) urlParams.append('cursor', params.cursor);
	if (params.orderBy) urlParams.append('orderBy', params.orderBy);
	return urlParams;
};

export { isApiSuccess, isApiError } from './helpers/is';
export type { ApiResponse, ApiSuccess, ApiError } from './helpers/types';
export { default as ApiException } from './helpers/ApiException';
