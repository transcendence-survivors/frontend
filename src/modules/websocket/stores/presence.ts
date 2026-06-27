'use client';

import { io } from 'socket.io-client';
import { PRESENCE_EVENTS } from '../constants/events';
import { PresenceStatus, type PresenceStore } from '../types/presence';
import { create } from 'zustand';
import { env } from '@/libs/env';
import { useShallow } from 'zustand/react/shallow';
import { Friend, FriendStatusChangePayload } from '../types/friend';

export const usePresenceStore = create<PresenceStore>((set, get) => ({
	socket: null,
	isConnected: false,
	globalOnlineCount: 0,

	onlineFriends: new Map<string, Friend>(),
	onlineFriendsCount: 0,

	actions: {
		initPresence: () => {
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

			socket.on(PRESENCE_EVENTS.SEND.GLOBAL_COUNT, (count: number) => {
				set({ globalOnlineCount: count });
			});
			socket.on(PRESENCE_EVENTS.SEND.INITIAL_FRIENDS, (friendsList: string[]) => {
				set({
					onlineFriends: new Map(
						friendsList.map((id) => [id, { status: PresenceStatus.ONLINE }]),
					),
					onlineFriendsCount: friendsList.length,
				});
			});

			socket.on(
				PRESENCE_EVENTS.SEND.STATUS_CHANGE,
				({ userId, status }: FriendStatusChangePayload) => {
					set((prev) => {
						const currentFriends = prev.onlineFriends;
						const friend = currentFriends.get(userId);
						if (friend && friend.status === status) return prev;
						if (status === PresenceStatus.OFFLINE) {
							if (!friend) return prev;
							const newFriends = new Map(currentFriends);
							newFriends.delete(userId);
							return {
								onlineFriends: newFriends,
								onlineFriendsCount: prev.onlineFriendsCount - 1,
							};
						}
						return {
							onlineFriends: new Map(currentFriends).set(userId, {
								status,
							}),
							onlineFriendsCount: friend
								? prev.onlineFriendsCount
								: prev.onlineFriendsCount + 1,
						};
					});
				},
			);
		},

		disconnectPresence: () => {
			const { socket } = get();
			if (!socket) return;
			socket.off(PRESENCE_EVENTS.SEND.GLOBAL_COUNT);
			socket.off(PRESENCE_EVENTS.SEND.INITIAL_FRIENDS);
			socket.off(PRESENCE_EVENTS.SEND.STATUS_CHANGE);
			socket.disconnect();
			set({
				socket: null,
				isConnected: false,
				onlineFriends: new Map<string, Friend>(),
				onlineFriendsCount: 0,
				globalOnlineCount: 0,
			});
		},

		goInvisible: () => {
			const { socket } = get();
			if (socket?.connected) {
				socket.emit(PRESENCE_EVENTS.RECEIVE.GO_INVISIBLE);
			}
		},
		goVisible: () => {
			const { socket } = get();
			if (socket?.connected) {
				socket.emit(PRESENCE_EVENTS.RECEIVE.GO_VISIBLE);
			}
		},
		goDoNotDisturb: () => {
			const { socket } = get();
			if (socket?.connected) {
				socket.emit(PRESENCE_EVENTS.RECEIVE.GO_DO_NOT_DISTURB);
			}
		},
	},
}));

export const usePresenceState = () =>
	usePresenceStore(
		useShallow((state) => ({
			isConnected: state.isConnected,
			globalOnlineCount: state.globalOnlineCount,
			onlineFriends: state.onlineFriends,
			onlineFriendsCount: state.onlineFriendsCount,
		})),
	);

export const usePresenceActions = () =>
	usePresenceStore(useShallow((state) => state.actions));
