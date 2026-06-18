import { FetchOptions, request } from './helpers/request';

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

	delete: <T>(path: string, init?: FetchOptions) =>
		request<T>(path, { ...init, method: 'DELETE' }),
};

export { isApiSuccess, isApiError } from './helpers/is';
export type { ApiResponse, ApiSuccess, ApiError } from './helpers/types';
export { default as ApiException } from './helpers/ApiException';
