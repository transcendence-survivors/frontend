import type { ApiError, ApiResponse, ApiSuccess } from './types';

const isApiSuccess = <T>(res: ApiResponse<T>): res is ApiSuccess<T> =>
	res.status === 'success';

const isApiError = <T>(res: ApiResponse<T>): res is ApiError => res.status === 'error';

const isApiResponse = <T>(res: unknown): res is ApiResponse<T> => {
	return (
		typeof res === 'object' &&
		res !== null &&
		'status' in res &&
		(res.status === 'success' || res.status === 'error')
	);
};

export { isApiSuccess, isApiError, isApiResponse };
