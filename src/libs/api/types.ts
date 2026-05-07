export type ApiSuccess<T> = {
	status: 'success';
	message: string;
	data: T;
};

export type ApiError = {
	status: 'error';
	message: string;
	code: number;
	errors?: unknown;
	timestamp: string;
	path: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
