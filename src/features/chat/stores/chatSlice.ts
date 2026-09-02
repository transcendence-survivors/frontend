import { StateCreator } from 'zustand';
import { SocketState } from '@/modules/websocket/types/socket';
import { ChatMessage } from '../types/message';
import { CHAT_EVENTS } from '../constants/events';
import { emit } from '@/modules/websocket/helpers/emit';
import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { QueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';

interface SendMessagePayload {
	roomId: string;
	content: string;
	attachmentUrls?: string[];
}

export interface ChatSlice {
	chatActions: {
		initChatListeners: (queryClient: QueryClient) => void;
		destroyChatListeners(): void;

		joinRoom: (roomId: string) => Promise<void>;
		leaveRoom: (roomId: string) => Promise<void>;
		sendMessage: (msg: SendMessagePayload) => void;
	};
}

export const createChatSlice: StateCreator<SocketState & ChatSlice, [], [], ChatSlice> = (
	_set,
	get,
) => {
	return {
		chatActions: {
			initChatListeners(queryClient) {
				const socket = get().socket;
				console.log('socket', socket);
				if (!socket) return;
				get().chatActions.destroyChatListeners();

				socket.on(CHAT_EVENTS.RECEIVE.MESSAGE_NEW, (message: ChatMessage) => {
					const queryKey = ['chat-messages', { roomId: message.roomId }];
					const existing = queryClient.getQueryData<{
						pages: { data: ChatMessage[] }[];
					}>(queryKey);

					const alreadyExists = existing?.pages.some((page) =>
						page.data.some((m) => m.id === message.id),
					);
					if (alreadyExists) return;

					updateInfiniteQuery<ChatMessage>(queryClient, queryKey, {
						type: 'append',
						item: message,
					});
				});

				socket.on(CHAT_EVENTS.RECEIVE.MESSAGE_EDITED, (message: ChatMessage) => {
					updateInfiniteQuery<ChatMessage>(
						queryClient,
						['chat-messages', { roomId: message.roomId }],
						{
							type: 'map',
							callback: (m) => (m.id === message.id ? message : m),
						},
					);
				});

				socket.on(
					CHAT_EVENTS.RECEIVE.MESSAGE_SOFT_DELETED,
					(payload: { id: string; roomId: string }) => {
						const callback = (m: ChatMessage) => {
							if (m.id === payload.id) {
								return {
									...m,
									isDeleted: true,
									content: undefined,
									attachmentUrls: [],
								};
							}
							return m;
						};
						updateInfiniteQuery<ChatMessage>(
							queryClient,
							['chat-messages', { roomId: payload.roomId }],
							{
								type: 'map',
								callback,
							},
						);
					},
				);
			},

			destroyChatListeners() {
				const socket = get().socket;
				if (!socket) return;

				socket.off(CHAT_EVENTS.RECEIVE.MESSAGE_NEW);
				socket.off(CHAT_EVENTS.RECEIVE.MESSAGE_EDITED);
				socket.off(CHAT_EVENTS.RECEIVE.MESSAGE_SOFT_DELETED);
			},

			async joinRoom(roomId) {
				const socket = get().socket;
				if (!socket) throw new Error('Socket is not connected');

				await emit({
					socket,
					event: CHAT_EVENTS.SEND.ROOM_JOIN,
					payload: { roomId },
				});
			},

			async leaveRoom(roomId) {
				const socket = get().socket;
				if (!socket) throw new Error('Socket is not connected');

				await emit({
					socket,
					event: CHAT_EVENTS.SEND.ROOM_LEAVE,
					payload: { roomId },
				});
			},

			async sendMessage(payload) {
				const socket = get().socket;
				if (!socket) throw new Error('Socket is not connected');

				return emit<ChatMessage>({
					socket,
					event: CHAT_EVENTS.SEND.MESSAGE_SEND,
					payload,
				});
			},
		},
	};
};

export const useChatActions = () => {
	return useWebsocketStore(
		useShallow((state) => ({
			joinRoom: state.chatActions.joinRoom,
			leaveRoom: state.chatActions.leaveRoom,
			sendMessage: state.chatActions.sendMessage,
			initChatListeners: state.chatActions.initChatListeners,
			destroyChatListeners: state.chatActions.destroyChatListeners,
		})),
	);
};
