export type WsSuccess<T> = {
	status: 'success';
	message: string;
	data: T;
};

export type WsError = {
	status: 'error';
	message: string;
	messageKey?: string;
	code: number;
	errors?: unknown;
};

export type WsResponse<T> = WsSuccess<T> | WsError;
