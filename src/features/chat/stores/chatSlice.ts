import { StateCreator } from 'zustand';
import { SocketState } from '@/modules/websocket/types/socket';

export interface ChatSlice {
	messages: string[];
	chatActions: {
		initChatListeners: () => void;
		sendMessage: (msg: string) => void;
	};
}

export const createChatSlice: StateCreator<SocketState & ChatSlice, [], [], ChatSlice> = (
	set,
	get,
) => ({
	messages: [],
	chatActions: {
		initChatListeners: () => {
			const socket = get().socket;
			if (!socket) return;

			socket.on('new_message', (msg) => {
				set((state) => ({ messages: [...state.messages, msg] }));
			});
		},
		sendMessage: (msg) => {
			get().socket?.emit('send_message', msg);
		},
	},
});
