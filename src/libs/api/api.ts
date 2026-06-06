import { request } from './client';

export type ApiRequestInit = RequestInit;

export const api = {
	get: <T>(path: string, init?: ApiRequestInit) =>
		request<T>(path, { ...init, method: 'GET' }),

	post: <T>(path: string, body?: unknown, init?: ApiRequestInit) =>
		request<T>(path, {
			...init,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...init?.headers,
			},
			body: body ? JSON.stringify(body) : undefined,
		}),

	put: <T>(path: string, body?: unknown, init?: ApiRequestInit) =>
		request<T>(path, {
			...init,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				...init?.headers,
			},
			body: body ? JSON.stringify(body) : undefined,
		}),

	delete: <T>(path: string, init?: ApiRequestInit) =>
		request<T>(path, { ...init, method: 'DELETE' }),
};
