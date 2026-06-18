export type ApiSuccess<T> = {
	status: 'success';
	message: string;
	data: T;
};

export type ApiError = {
	status: 'error';
	message: string;
	messageKey?: string;
	code: number;
	errors?: unknown;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
