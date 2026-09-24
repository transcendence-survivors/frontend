import { StateCreator } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { QueryClient } from '@tanstack/react-query';
import { SocketState } from '@/modules/websocket/types/socket';
import { CHAT_EVENTS } from '../constants/events';
import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { invalidateQueries } from '@/libs/api/helpers/queryInvalidator';
import { emit } from '@/modules/websocket/helpers/emit';
import { ChatRoom } from '../types/room';
import { updateInfiniteQueries } from '@/libs/api/helpers/infiniteQuery';

export interface NotificationSliceState {
	totalUnreadCount: number;
	unreadCountsByRoom: Record<string, number>;
	currentRoomId: string | null;
}

export interface NotificationSliceActions {
	setUnreadSummary: (total: number, roomCounts?: Record<string, number>) => void;
	setRoomUnreadCount: (roomId: string, count: number) => void;
	mergeRoomUnreadCounts: (roomCounts: Record<string, number>) => void;
	setCurrentRoomId: (roomId: string | null) => void;

	markRoomAsRead: (roomId: string, queryClient: QueryClient) => Promise<void>;
	incrementRoomUnread: (roomId: string) => void;

	clearNotificationState: () => void;

	initNotificationListeners: (queryClient: QueryClient) => void;
	destroyNotificationListeners: () => void;
}

interface NotificationReadPayload {
	roomId: string;
	readAt: string;
}

interface NotificationMemberMutationPayload {
	roomId: string;
	userId: string;
	type: 'JOIN' | 'LEAVE' | 'ROLE_UPDATE' | 'KICKED';
}

interface NotificationNewPayload {
	roomId: string;
}

export type NotificationSlice = NotificationSliceState & {
	notificationActions: NotificationSliceActions;
};

export const createNotificationSlice: StateCreator<
	SocketState & NotificationSlice,
	[],
	[],
	NotificationSlice
> = (set, get) => {
	let onMessageRead: ((data: NotificationReadPayload) => void) | null = null;
	let onNewMessage: ((data: NotificationNewPayload) => void) | null = null;
	let onMemberMutation: ((data: NotificationMemberMutationPayload) => void) | null =
		null;

	const invalidateUnreadCount = (queryClient: QueryClient): void => {
		invalidateQueries(queryClient, ['chat-notifications', 'unread-count'], {
			mode: 'debounce',
			delay: 1000,
		});
	};

	const invalidateRooms = (queryClient: QueryClient): void => {
		invalidateQueries(queryClient, ['chat-rooms'], {
			mode: 'debounce',
			delay: 1000,
		});
	};

	const invalidateMessages = (queryClient: QueryClient, roomId: string): void => {
		invalidateQueries(queryClient, ['chat-messages', roomId], {
			mode: 'debounce',
			delay: 1000,
			reset: true,
		});
	};

	const invalidateMembers = (queryClient: QueryClient, roomId: string): void => {
		invalidateQueries(queryClient, ['chat-members', roomId], {
			mode: 'debounce',
			delay: 1000,
			reset: true,
		});
	};

	return {
		totalUnreadCount: 0,
		unreadCountsByRoom: {},
		currentRoomId: null,

		notificationActions: {
			setUnreadSummary(total, roomCounts = {}) {
				set((state) => ({
					totalUnreadCount: total,
					unreadCountsByRoom: {
						...state.unreadCountsByRoom,
						...roomCounts,
					},
				}));
			},

			setRoomUnreadCount(roomId, count) {
				set((state) => {
					const currentCount = state.unreadCountsByRoom[roomId] ?? 0;
					const delta = count - currentCount;

					return {
						totalUnreadCount: Math.max(0, state.totalUnreadCount + delta),
						unreadCountsByRoom: {
							...state.unreadCountsByRoom,
							[roomId]: count,
						},
					};
				});
			},

			mergeRoomUnreadCounts(roomCounts) {
				set((state) => ({
					unreadCountsByRoom: {
						...state.unreadCountsByRoom,
						...roomCounts,
					},
				}));
			},

			setCurrentRoomId(roomId) {
				set({ currentRoomId: roomId });
			},

			async markRoomAsRead(roomId, queryClient) {
				set((state) => {
					const currentRoomUnread = state.unreadCountsByRoom[roomId] ?? 0;
					return {
						totalUnreadCount: Math.max(
							0,
							state.totalUnreadCount - currentRoomUnread,
						),
						unreadCountsByRoom: {
							...state.unreadCountsByRoom,
							[roomId]: 0,
						},
					};
				});

				updateInfiniteQueries<ChatRoom>(queryClient, ['chat-rooms'], {
					type: 'map',
					callback: (room) =>
						room.id === roomId ? { ...room, unreadCount: 0 } : room,
				});

				const socket = get().socket;
				if (!socket) return;
				await emit({
					socket,
					event: CHAT_EVENTS.SEND.NOTIFICATION_MARK_AS_READ,
					payload: { roomId },
				});
			},

			incrementRoomUnread(roomId) {
				set((state) => ({
					totalUnreadCount: state.totalUnreadCount + 1,
					unreadCountsByRoom: {
						...state.unreadCountsByRoom,
						[roomId]: (state.unreadCountsByRoom[roomId] ?? 0) + 1,
					},
				}));
			},

			clearNotificationState() {
				set({
					totalUnreadCount: 0,
					unreadCountsByRoom: {},
					currentRoomId: null,
				});
			},

			initNotificationListeners(queryClient) {
				const socket = get().socket;
				if (!socket) return;

				get().notificationActions.destroyNotificationListeners();

				onMessageRead = (data: NotificationReadPayload) => {
					set((state) => {
						const currentRoomUnread =
							state.unreadCountsByRoom[data.roomId] ?? 0;
						return {
							totalUnreadCount: Math.max(
								0,
								state.totalUnreadCount - currentRoomUnread,
							),
							unreadCountsByRoom: {
								...state.unreadCountsByRoom,
								[data.roomId]: 0,
							},
						};
					});
					invalidateUnreadCount(queryClient);
				};

				onNewMessage = (data: NotificationNewPayload) => {
					const activeRoomId = get().currentRoomId;
					if (activeRoomId !== data.roomId) {
						get().notificationActions.incrementRoomUnread(data.roomId);
						invalidateUnreadCount(queryClient);
						invalidateRooms(queryClient);
						invalidateMessages(queryClient, data.roomId);
					}
				};

				onMemberMutation = (data: NotificationMemberMutationPayload) => {
					const activeRoomId = get().currentRoomId;
					if (activeRoomId !== data.roomId) {
						invalidateMembers(queryClient, data.roomId);
					}
				};

				socket.on(CHAT_EVENTS.RECEIVE.NOTIFICATION_READ, onMessageRead);
				socket.on(CHAT_EVENTS.RECEIVE.NOTIFICATION_MESSAGE_NEW, onNewMessage);
				socket.on(
					CHAT_EVENTS.RECEIVE.NOTIFICATION_MEMBER_MUTATION,
					onMemberMutation,
				);
			},

			destroyNotificationListeners() {
				const socket = get().socket;
				if (!socket) return;

				if (onMessageRead) {
					socket.off(CHAT_EVENTS.RECEIVE.NOTIFICATION_READ, onMessageRead);
					onMessageRead = null;
				}

				if (onNewMessage) {
					socket.off(
						CHAT_EVENTS.RECEIVE.NOTIFICATION_MESSAGE_NEW,
						onNewMessage,
					);
					onNewMessage = null;
				}
				if (onMemberMutation) {
					socket.off(
						CHAT_EVENTS.RECEIVE.NOTIFICATION_MEMBER_MUTATION,
						onMemberMutation,
					);
					onMemberMutation = null;
				}
			},
		},
	};
};
export const useNotificationActions = () => {
	return useWebsocketStore(useShallow((state) => state.notificationActions));
};

export const useTotalUnreadCount = (): number => {
	return useWebsocketStore(useShallow((state) => state.totalUnreadCount));
};

export const useRoomUnreadCount = (roomId: string): number => {
	return useWebsocketStore(
		useShallow((state) => state.unreadCountsByRoom[roomId] ?? -1),
	);
};

export const useCurrentRoomId = (): string | null => {
	return useWebsocketStore(useShallow((state) => state.currentRoomId));
};
