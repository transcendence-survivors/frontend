import { Socket } from 'socket.io-client';
import { WsResponse } from '../types/response';

interface EmitParams {
	socket: Socket;
	event: string;
	payload: unknown;
}

export const emit = <T>(params: EmitParams) => {
	const { socket, event, payload } = params;
	return new Promise((resolve, reject) => {
		socket.emit(event, payload, (response: WsResponse<T>) => {
			if (response.status === 'success') resolve(response.data);
			else reject(new Error(response.message));
		});
	});
};
