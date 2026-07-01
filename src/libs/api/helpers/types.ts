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

export type CursorParams<T extends string> = {
	cursor?: string;
	limit?: number;
	search?: string;
	orderBy?: T;
};

export type CursorResponse<T> = {
	data: T;
	meta: {
		hasNextPage: boolean;
		nextCursor: string | null;
	};
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
