import { StateCreator } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { QueryClient } from '@tanstack/react-query';
import { SocketState } from '@/modules/websocket/types/socket';
import { CHAT_EVENTS } from '../constants/events';
import { emit } from '@/modules/websocket/helpers/emit';
import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { ChatRoom, ChatRoomType } from '../types/room';
import { ChatMemberRole } from '../types/member';
import { invalidateQueries } from '@/libs/api/helpers/queryInvalidator';

export interface RoomSliceState {
	room: ChatRoom | null;
	role: ChatMemberRole;
}

export interface RoomSliceActions {
	setRoom: (room: ChatRoom) => void;
	setRoomRole: (role: ChatMemberRole) => void;

	patchRoom: (partialRoom: Partial<ChatRoom>) => void;

	clearRoomState: () => void;

	initRoomListeners: (queryClient: QueryClient) => void;
	destroyRoomListeners: () => void;

	joinRoom: (roomId: string) => Promise<void>;
	leaveRoom: (roomId: string) => Promise<void>;
}

export interface RoomSlice {
	roomState: RoomSliceState;
	roomActions: RoomSliceActions;
}

export const createRoomSlice: StateCreator<SocketState & RoomSlice, [], [], RoomSlice> = (
	set,
	get,
) => {
	return {
		roomState: {
			room: null,
			role: 'MEMBER',
		},

		roomActions: {
			setRoom(room) {
				set((state) => ({
					roomState: {
						...state.roomState,
						room,
					},
				}));
			},

			setRoomRole(role) {
				set((state) => ({
					roomState: {
						...state.roomState,
						role,
					},
				}));
			},

			patchRoom(partialRoom) {
				set((state) => {
					if (!state.roomState.room) return state;
					return {
						roomState: {
							...state.roomState,
							room: {
								...state.roomState.room,
								...partialRoom,
							} as ChatRoom,
						},
					};
				});
			},

			clearRoomState() {
				set({
					roomState: { room: null, role: 'MEMBER' },
				});
			},

			initRoomListeners(queryClient) {
				const socket = get().socket;
				if (!socket) return;

				get().roomActions.destroyRoomListeners();

				socket.on(
					CHAT_EVENTS.RECEIVE.MEMBER_ADDED,
					(data: { roomId: string; userId: string }) => {
						const room = get().roomState.room;

						if (
							!room ||
							room.id !== data.roomId ||
							room.type !== ChatRoomType.GROUP ||
							room.memberIds.includes(data.userId)
						) {
							return;
						}

						get().roomActions.patchRoom({
							memberIds: [...room.memberIds, data.userId],
							memberCount: room.memberCount + 1,
						} as Partial<ChatRoom>);

						invalidateQueries(queryClient, ['chat-members', data.roomId], {
							mode: 'debounce',
							delay: 1000,
						});
						invalidateQueries(queryClient, ['chat-rooms'], {
							mode: 'debounce',
							delay: 1000,
						});
					},
				);

				socket.on(
					CHAT_EVENTS.RECEIVE.MEMBER_REMOVED,
					(data: { roomId: string; userId: string }) => {
						const room = get().roomState.room;

						if (
							room &&
							room.id === data.roomId &&
							room.type === ChatRoomType.GROUP
						) {
							if (room.memberIds.includes(data.userId)) {
								get().roomActions.patchRoom({
									memberIds: room.memberIds.filter(
										(id) => id !== data.userId,
									),
									memberCount: room.memberCount - 1,
								} as Partial<ChatRoom>);
							}
						}

						invalidateQueries(queryClient, ['chat-members', data.roomId], {
							mode: 'debounce',
							delay: 1000,
						});
						invalidateQueries(queryClient, ['chat-rooms'], {
							mode: 'debounce',
							delay: 1000,
						});
					},
				);
			},

			destroyRoomListeners() {
				const socket = get().socket;
				if (!socket) return;

				socket.off(CHAT_EVENTS.RECEIVE.MEMBER_ADDED);
			},

			async joinRoom(roomId) {
				const socket = get().socket;
				if (!socket) return;

				await emit<void>({
					socket,
					event: CHAT_EVENTS.SEND.ROOM_JOIN,
					payload: { roomId },
				});
			},

			async leaveRoom(roomId) {
				const socket = get().socket;
				if (!socket) return;

				await emit<void>({
					socket,
					event: CHAT_EVENTS.SEND.ROOM_LEAVE,
					payload: { roomId },
				});
			},
		},
	};
};

export const useRoomActions = () => {
	return useWebsocketStore(
		useShallow((state) => ({
			setRoom: state.roomActions.setRoom,
			setRoomRole: state.roomActions.setRoomRole,
			patchRoom: state.roomActions.patchRoom,
			clearRoomState: state.roomActions.clearRoomState,
			initRoomListeners: state.roomActions.initRoomListeners,
			destroyRoomListeners: state.roomActions.destroyRoomListeners,
			joinRoom: state.roomActions.joinRoom,
			leaveRoom: state.roomActions.leaveRoom,
		})),
	);
};

export const useRoom = () => {
	return useWebsocketStore((state) => state.roomState.room);
};

export const useRoomMemberIds = (): string[] => {
	return useWebsocketStore((state) => {
		const room = state.roomState.room;
		if (!room) return [];
		if (room.type === ChatRoomType.GROUP) {
			return room.memberIds;
		}
		return [room.otherMember.id];
	});
};

export const useRoomRole = () => {
	return useWebsocketStore((state) => state.roomState.role);
};

export const useRoomType = (): ChatRoomType | null => {
	return useWebsocketStore((state) => {
		const room = state.roomState.room;
		if (!room) return null;
		return room.type;
	});
};
