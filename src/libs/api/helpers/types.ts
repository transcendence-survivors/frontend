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

export type BasePaginationParams<T extends string> = {
	page?: number;
	limit?: number;
	search?: string;
	orderBy?: T;
};
export type PaginationResponse<T> = {
	data: T;
	meta: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
		itemsCount: number;
	};
};

export type BaseCursorPaginationParams<T extends string> = {
	cursor?: string;
	limit?: number;
	search?: string;
	orderBy?: T;
};
export type CursorPaginationResponse<T> = {
	data: T;
	meta: {
		hasNextPage: boolean;
		nextCursor: string | null;
	};
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
