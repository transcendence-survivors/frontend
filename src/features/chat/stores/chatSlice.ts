import { StateCreator } from 'zustand';
import { SocketState } from '@/modules/websocket/types/socket';
import { ChatMessage } from '../types/message';
import { CHAT_EVENTS } from '../constants/events';
import { emit } from '@/modules/websocket/helpers/emit';

interface SendMessagePayload {
	roomId: string;
	content: string;
	attachmentUrls?: string[];
}

export interface ChatSlice {
	messages: ChatMessage[];
	chatActions: {
		initChatListeners: () => void;
		destroyChatListeners(): void;
		sendMessage: (msg: SendMessagePayload) => void;
	};
}

export const createChatSlice: StateCreator<SocketState & ChatSlice, [], [], ChatSlice> = (
	set,
	get,
) => {
	const onNewMessage = (message: ChatMessage) => {
		set((state) => ({
			messages: [...state.messages, message],
		}));
	};

	return {
		messages: [],

		chatActions: {
			initChatListeners() {
				const socket = get().socket;
				if (!socket) return;

				socket.off(CHAT_EVENTS.RECEIVE.MESSAGE_NEW, onNewMessage);
				socket.on(CHAT_EVENTS.RECEIVE.MESSAGE_NEW, onNewMessage);
			},

			destroyChatListeners() {
				const { socket } = get();
				socket?.off(CHAT_EVENTS.RECEIVE.MESSAGE_NEW, onNewMessage);
			},

			async sendMessage(payload) {
				const socket = get().socket;

				if (!socket) {
					throw new Error('Socket is not connected');
				}

				return emit<ChatMessage>({
					socket,
					event: 'chat:message:send',
					payload,
				});
			},
		},
	};
};
