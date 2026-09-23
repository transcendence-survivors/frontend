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
import { updateInfiniteQueries } from '@/libs/api/helpers/infiniteQuery';
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

export type RoomSlice = RoomSliceState & {
	roomActions: RoomSliceActions;
};

export const createRoomSlice: StateCreator<SocketState & RoomSlice, [], [], RoomSlice> = (
	set,
	get,
) => {
	let onMemberAddedHandler: ((data: MemberAdded) => void) | null = null;
	let onMemberRemovedHandler: ((data: MemberRemoved) => void) | null = null;
	let onMemberRoleUpdatedHandler: ((data: MemberRoleUpdated) => void) | null = null;
	let onRoomRenamedHandler: ((data: RoomRenamed) => void) | null = null;
	let onRoomAvatarChangedHandler: ((data: RoomAvatarChanged) => void) | null = null;

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
		room: null,
		role: 'MEMBER',
		userId: null,

		roomActions: {
			setRoom(room) {
				set({ room });
			},

			setRoomRole(role) {
				set({ role });
			},

			setUserId(userId) {
				set({ userId });
			},

			patchRoom(partialRoom) {
				set((state) => {
					if (!state.room) return state;
					return {
						room: {
							...state.room,
							...partialRoom,
						} as ChatRoom,
					};
				});
			},

			clearRoomState() {
				set({ room: null, role: 'MEMBER', userId: null });
			},

			initRoomListeners(queryClient) {
				const socket = get().socket;
				if (!socket) return;

				get().roomActions.destroyRoomListeners();

				onMemberAddedHandler = (data: MemberAdded) => {
					const room = get().room;

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
				};

				onMemberRemovedHandler = (data: MemberRemoved) => {
					const room = get().room;

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
				};

				onMemberRoleUpdatedHandler = (data: MemberRoleUpdated) => {
					const { room, role, userId } = get();

					if (!room || room.id !== data.roomId) return;
					if (data.targetUserId === userId && role !== data.newRole) {
						get().roomActions.setRoomRole(data.newRole);
					}

					invalidateMembers(queryClient, data.roomId);
					updateInfiniteQueries<ChatMessage>(
						queryClient,
						['chat-messages', data.roomId],
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
				};

				onRoomRenamedHandler = (data: RoomRenamed) => {
					const room = get().room;

					if (!room || room.id !== data.roomId) return;
					get().roomActions.patchRoom({
						name: data.newName,
					});
					invalidateRooms(queryClient);
				};

				onRoomAvatarChangedHandler = (data: RoomAvatarChanged) => {
					const room = get().room;

					if (!room || room.id !== data.roomId) return;
					get().roomActions.patchRoom({
						avatarUrl: data.newAvatarUrl,
					});
					invalidateRooms(queryClient);
				};

				socket.on(CHAT_EVENTS.RECEIVE.MEMBER_ADDED, onMemberAddedHandler);
				socket.on(CHAT_EVENTS.RECEIVE.MEMBER_REMOVED, onMemberRemovedHandler);
				socket.on(
					CHAT_EVENTS.RECEIVE.MEMBER_ROLE_UPDATED,
					onMemberRoleUpdatedHandler,
				);
				socket.on(CHAT_EVENTS.RECEIVE.ROOM_RENAMED, onRoomRenamedHandler);
				socket.on(
					CHAT_EVENTS.RECEIVE.ROOM_AVATAR_CHANGED,
					onRoomAvatarChangedHandler,
				);
			},

			destroyRoomListeners() {
				const socket = get().socket;
				if (!socket) return;

				if (onMemberAddedHandler) {
					socket.off(CHAT_EVENTS.RECEIVE.MEMBER_ADDED, onMemberAddedHandler);
					onMemberAddedHandler = null;
				}
				if (onMemberRemovedHandler) {
					socket.off(
						CHAT_EVENTS.RECEIVE.MEMBER_REMOVED,
						onMemberRemovedHandler,
					);
					onMemberRemovedHandler = null;
				}
				if (onMemberRoleUpdatedHandler) {
					socket.off(
						CHAT_EVENTS.RECEIVE.MEMBER_ROLE_UPDATED,
						onMemberRoleUpdatedHandler,
					);
					onMemberRoleUpdatedHandler = null;
				}
				if (onRoomRenamedHandler) {
					socket.off(CHAT_EVENTS.RECEIVE.ROOM_RENAMED, onRoomRenamedHandler);
					onRoomRenamedHandler = null;
				}
				if (onRoomAvatarChangedHandler) {
					socket.off(
						CHAT_EVENTS.RECEIVE.ROOM_AVATAR_CHANGED,
						onRoomAvatarChangedHandler,
					);
					onRoomAvatarChangedHandler = null;
				}
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
	return useWebsocketStore(useShallow((state) => state.room));
};

export const useRoomMemberIds = (): string[] => {
	return useWebsocketStore(
		useShallow((state) => {
			const room = state.room;
			if (!room) return [];
			if (room.type === ChatRoomType.GROUP) {
				return room.memberIds;
			}
			return [room.otherMember.id];
		}),
	);
};

export const useRoomRole = () => {
	return useWebsocketStore(useShallow((state) => state.role));
};

export const useRoomType = (): ChatRoomType | null => {
	return useWebsocketStore(
		useShallow((state) => {
			const room = state.room;
			if (!room) return null;
			return room.type;
		}),
	);
};
