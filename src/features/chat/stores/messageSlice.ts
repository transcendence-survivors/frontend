import { StateCreator } from 'zustand';
import { SocketState } from '@/modules/websocket/types/socket';
import { ChatMessage } from '../types/message';
import { CHAT_EVENTS } from '../constants/events';
import { emit } from '@/modules/websocket/helpers/emit';
import { updateInfiniteQueries } from '@/libs/api/helpers/infiniteQuery';
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

export interface MessageSliceActions {
	initMessageListeners: (queryClient: QueryClient) => void;
	destroyMessageListeners: () => void;

	sendMessage: (msg: SendMessagePayload) => Promise<void>;
	editMessage: (msg: EditMessagePayload) => Promise<void>;
	softDeleteMessage: (messageId: string) => Promise<void>;
}

export interface MessageSlice {
	chatMessageActions: MessageSliceActions;
}

export const createMessageSlice: StateCreator<
	SocketState & MessageSlice,
	[],
	[],
	MessageSlice
> = (_set, get) => {
	let onMessageNewHandler: ((message: ChatMessage) => void) | null = null;
	let onMessageEditedHandler: ((message: ChatMessage) => void) | null = null;
	let onMessageSoftDeletedHandler:
		((data: { messageId: string; roomId: string }) => void) | null = null;

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

				onMessageNewHandler = (message: ChatMessage) => {
					const existing = queryClient.getQueryData<{
						pages: { data: ChatMessage[] }[];
					}>(queryKey(message.roomId));

					const alreadyExists = existing?.pages.some((page) =>
						page.data.some((m) => m.id === message.id),
					);
					if (alreadyExists) return;
					updateInfiniteQueries<ChatMessage>(
						queryClient,
						queryKey(message.roomId),
						{
							type: 'append',
							item: message,
						},
					);
					invalidateRooms(queryClient);
				};

				onMessageEditedHandler = (message: ChatMessage) => {
					updateInfiniteQueries<ChatMessage>(
						queryClient,
						queryKey(message.roomId),
						{
							type: 'map',
							callback: (m) => (m.id === message.id ? message : m),
						},
					);
				};

				onMessageSoftDeletedHandler = (data: {
					messageId: string;
					roomId: string;
				}) => {
					updateInfiniteQueries<ChatMessage>(
						queryClient,
						queryKey(data.roomId),
						{
							type: 'map',
							callback: (m) => {
								if (m.id === data.messageId) {
									return {
										...m,
										isDeleted: true,
									};
								}
								return m;
							},
						},
					);
				};

				socket.on(CHAT_EVENTS.RECEIVE.MESSAGE_NEW, onMessageNewHandler);
				socket.on(CHAT_EVENTS.RECEIVE.MESSAGE_EDITED, onMessageEditedHandler);
				socket.on(
					CHAT_EVENTS.RECEIVE.MESSAGE_SOFT_DELETED,
					onMessageSoftDeletedHandler,
				);
			},

			destroyMessageListeners() {
				const socket = get().socket;
				if (!socket) return;

				if (onMessageNewHandler) {
					socket.off(CHAT_EVENTS.RECEIVE.MESSAGE_NEW, onMessageNewHandler);
					onMessageNewHandler = null;
				}
				if (onMessageEditedHandler) {
					socket.off(
						CHAT_EVENTS.RECEIVE.MESSAGE_EDITED,
						onMessageEditedHandler,
					);
					onMessageEditedHandler = null;
				}
				if (onMessageSoftDeletedHandler) {
					socket.off(
						CHAT_EVENTS.RECEIVE.MESSAGE_SOFT_DELETED,
						onMessageSoftDeletedHandler,
					);
					onMessageSoftDeletedHandler = null;
				}
			},

			async sendMessage(payload) {
				const socket = get().socket;
				if (!socket) return;

				await emit<void>({
					socket,
					event: CHAT_EVENTS.SEND.MESSAGE_SEND,
					payload,
				});
			},

			async editMessage(payload) {
				const socket = get().socket;
				if (!socket) return;

				await emit<void>({
					socket,
					event: CHAT_EVENTS.SEND.MESSAGE_EDIT,
					payload,
				});
			},

			async softDeleteMessage(messageId) {
				const socket = get().socket;
				if (!socket) return;

				await emit<void>({
					socket,
					event: CHAT_EVENTS.SEND.MESSAGE_SOFT_DELETE,
					payload: { messageId },
				});
			},
		},
	};
};

export const useMessageActions = () => {
	return useWebsocketStore(useShallow((state) => state.chatMessageActions));
};
