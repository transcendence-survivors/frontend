import { io, Socket } from 'socket.io-client';
import { StateCreator } from 'zustand';
import { env } from '@/libs/env';

export interface SocketSlice {
	socket: Socket | null;
	isConnected: boolean;
	socketActions: {
		connectSocket: () => void;
		disconnectSocket: () => void;
	};
}

export const createSocketSlice: StateCreator<SocketSlice, [], [], SocketSlice> = (
	set,
	get,
) => ({
	socket: null,
	isConnected: false,

	socketActions: {
		connectSocket: () => {
			if (get().socket?.connected) return;

			const socket = io(env.NEXT_PUBLIC_SOCKET_URL, {
				withCredentials: true,
				transports: ['websocket', 'polling'],
				autoConnect: true,
			});

			socket.on('connect', () => {
				set({ isConnected: true, socket });
			});

			socket.on('disconnect', () => {
				set({ isConnected: false });
			});
		},

		disconnectSocket: () => {
			const { socket } = get();
			if (!socket) return;

			socket.disconnect();
			set({ socket: null, isConnected: false });
		},
	},
});
