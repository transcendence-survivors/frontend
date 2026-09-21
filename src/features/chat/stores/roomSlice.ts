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
import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { ChatMessage } from '../types/message';

export interface RoomSliceState {
	room: ChatRoom | null;
	role: ChatMemberRole;
	userId: string | null;
}

export interface RoomSliceActions {
	setRoom: (room: ChatRoom) => void;
	setRoomRole: (role: ChatMemberRole) => void;
	setUserId: (userId: string | null) => void;

	patchRoom: (partialRoom: Partial<ChatRoom>) => void;

	clearRoomState: () => void;

	initRoomListeners: (queryClient: QueryClient) => void;
	destroyRoomListeners: () => void;
	joinRoom: (roomId: string) => Promise<void>;
	leaveRoom: (roomId: string) => Promise<void>;
}

interface MemberAdded {
	roomId: string;
	userId: string;
}

interface MemberRemoved {
	roomId: string;
	userId: string;
}

interface MemberRoleUpdated {
	roomId: string;
	targetUserId: string;
	newRole: ChatMemberRole;
}

interface RoomRenamed {
	roomId: string;
	newName: string;
}

interface RoomAvatarChanged {
	roomId: string;
	newAvatarUrl: string | null;
}

export interface RoomSlice {
	roomState: RoomSliceState;
	roomActions: RoomSliceActions;
}

export const createRoomSlice: StateCreator<SocketState & RoomSlice, [], [], RoomSlice> = (
	set,
	get,
) => {
	const invalidateRooms = (queryClient: QueryClient): void => {
		invalidateQueries(queryClient, ['chat-rooms'], {
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
		roomState: {
			room: null,
			role: 'MEMBER',
			userId: null,
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

			setUserId(userId) {
				set((state) => ({
					roomState: {
						...state.roomState,
						userId,
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
					roomState: { room: null, role: 'MEMBER', userId: null },
				});
			},

			initRoomListeners(queryClient) {
				const socket = get().socket;
				if (!socket) return;

				get().roomActions.destroyRoomListeners();

				socket.on(CHAT_EVENTS.RECEIVE.MEMBER_ADDED, (data: MemberAdded) => {
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
					});

					invalidateMembers(queryClient, data.roomId);
					invalidateRooms(queryClient);
				});

				socket.on(CHAT_EVENTS.RECEIVE.MEMBER_REMOVED, (data: MemberRemoved) => {
					const room = get().roomState.room;

					if (
						!room ||
						room.id !== data.roomId ||
						room.type !== ChatRoomType.GROUP ||
						!room.memberIds.includes(data.userId)
					) {
						return;
					}
					get().roomActions.patchRoom({
						memberIds: room.memberIds.filter((id) => id !== data.userId),
						memberCount: room.memberCount - 1,
					});

					invalidateMembers(queryClient, data.roomId);
					invalidateRooms(queryClient);
				});

				socket.on(
					CHAT_EVENTS.RECEIVE.MEMBER_ROLE_UPDATED,
					(data: MemberRoleUpdated) => {
						const { room, role, userId } = get().roomState;

						if (!room || room.id !== data.roomId) return;
						if (data.targetUserId === userId && role !== data.newRole) {
							get().roomActions.setRoomRole(data.newRole);
						}

						invalidateMembers(queryClient, data.roomId);
						updateInfiniteQuery<ChatMessage>(
							queryClient,
							['chat-members', data.roomId],
							{
								type: 'map',
								callback: (m) => {
									if (
										m.type === 'TEXT' &&
										m.sender.id === data.targetUserId
									) {
										return {
											...m,
											sender: { ...m.sender, role: data.newRole },
										};
									}
									return m;
								},
							},
						);
					},
				);

				socket.on(CHAT_EVENTS.RECEIVE.ROOM_RENAMED, (data: RoomRenamed) => {
					const room = get().roomState.room;

					if (!room || room.id !== data.roomId) return;
					get().roomActions.patchRoom({
						name: data.newName,
					});

					invalidateRooms(queryClient);
				});

				socket.on(
					CHAT_EVENTS.RECEIVE.ROOM_AVATAR_CHANGED,
					(data: RoomAvatarChanged) => {
						const room = get().roomState.room;

						if (!room || room.id !== data.roomId) return;

						get().roomActions.patchRoom({
							avatarUrl: data.newAvatarUrl,
						});

						invalidateRooms(queryClient);
					},
				);
			},

			destroyRoomListeners() {
				const socket = get().socket;
				if (!socket) return;

				socket.off(CHAT_EVENTS.RECEIVE.MEMBER_ADDED);
				socket.off(CHAT_EVENTS.RECEIVE.MEMBER_REMOVED);
				socket.off(CHAT_EVENTS.RECEIVE.MEMBER_ROLE_UPDATED);
				socket.off(CHAT_EVENTS.RECEIVE.ROOM_RENAMED);
				socket.off(CHAT_EVENTS.RECEIVE.ROOM_AVATAR_CHANGED);
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
			...state.roomActions,
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
