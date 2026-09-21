import { StateCreator } from 'zustand';
import { SocketState } from '@/modules/websocket/types/socket';
import { ChatMessage } from '../types/message';
import { CHAT_EVENTS } from '../constants/events';
import { emit } from '@/modules/websocket/helpers/emit';
import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { QueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { invalidateQueries } from '@/libs/api/helpers/queryInvalidator';

export interface SendMessagePayload {
	roomId: string;
	content: string;
	attachmentUrls?: string[];
	replyToId?: string;
}

export interface EditMessagePayload {
	roomId: string;
	messageId: string;
	content: string;
}

export interface MessageSlice {
	chatMessageActions: {
		initMessageListeners: (queryClient: QueryClient) => void;
		destroyMessageListeners(): void;

		sendMessage: (msg: SendMessagePayload) => void;
		editMessage: (msg: EditMessagePayload) => void;
		softDeleteMessage: (messageId: string) => void;
	};
}

export const createMessageSlice: StateCreator<
	SocketState & MessageSlice,
	[],
	[],
	MessageSlice
> = (_set, get) => {
	const queryKey = (roomId: string) => ['chat-messages', roomId];

	const invalidateRooms = (queryClient: QueryClient) => {
		invalidateQueries(queryClient, ['chat-rooms'], {
			mode: 'debounce',
			delay: 1000,
		});
	};

	return {
		chatMessageActions: {
			initMessageListeners(queryClient) {
				const socket = get().socket;
				if (!socket) return;
				get().chatMessageActions.destroyMessageListeners();

				socket.on(CHAT_EVENTS.RECEIVE.MESSAGE_NEW, (message: ChatMessage) => {
					const existing = queryClient.getQueryData<{
						pages: { data: ChatMessage[] }[];
					}>(queryKey(message.roomId));

					const alreadyExists = existing?.pages.some((page) =>
						page.data.some((m) => m.id === message.id),
					);
					if (alreadyExists) return;
					updateInfiniteQuery<ChatMessage>(
						queryClient,
						queryKey(message.roomId),
						{
							type: 'append',
							item: message,
						},
					);
					invalidateRooms(queryClient);
				});

				socket.on(CHAT_EVENTS.RECEIVE.MESSAGE_EDITED, (message: ChatMessage) => {
					updateInfiniteQuery<ChatMessage>(
						queryClient,
						queryKey(message.roomId),
						{
							type: 'map',
							callback: (m) => (m.id === message.id ? message : m),
						},
					);
				});

				socket.on(
					CHAT_EVENTS.RECEIVE.MESSAGE_SOFT_DELETED,
					(message: { messageId: string; roomId: string }) => {
						updateInfiniteQuery<ChatMessage>(
							queryClient,
							queryKey(message.roomId),
							{
								type: 'map',
								callback: (m) => {
									if (m.id === message.messageId) {
										return {
											...m,
											isDeleted: true,
										};
									}
									return m;
								},
							},
						);
					},
				);
			},

			destroyMessageListeners() {
				const socket = get().socket;
				if (!socket) return;

				socket.off(CHAT_EVENTS.RECEIVE.MESSAGE_NEW);
				socket.off(CHAT_EVENTS.RECEIVE.MESSAGE_EDITED);
				socket.off(CHAT_EVENTS.RECEIVE.MESSAGE_SOFT_DELETED);
			},

			async sendMessage(payload) {
				const socket = get().socket;
				if (!socket) return;

				return emit<void>({
					socket,
					event: CHAT_EVENTS.SEND.MESSAGE_SEND,
					payload,
				});
			},

			async editMessage(payload) {
				const socket = get().socket;
				if (!socket) return;

				return emit<void>({
					socket,
					event: CHAT_EVENTS.SEND.MESSAGE_EDIT,
					payload,
				});
			},

			async softDeleteMessage(messageId) {
				const socket = get().socket;
				if (!socket) return;

				return emit<void>({
					socket,
					event: CHAT_EVENTS.SEND.MESSAGE_SOFT_DELETE,
					payload: { messageId },
				});
			},
		},
	};
};

export const useMessageActions = () => {
	return useWebsocketStore(
		useShallow((state) => ({
			sendMessage: state.chatMessageActions.sendMessage,
			editMessage: state.chatMessageActions.editMessage,
			softDeleteMessage: state.chatMessageActions.softDeleteMessage,
			initMessageListeners: state.chatMessageActions.initMessageListeners,
			destroyMessageListeners: state.chatMessageActions.destroyMessageListeners,
		})),
	);
};
