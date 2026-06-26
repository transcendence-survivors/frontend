'use client';

import { io } from 'socket.io-client';
import { PRESENCE_EVENTS } from '../constants/events';
import { type PresenceStore } from '../types/presence';
import { create } from 'zustand';
import { env } from '@/libs/env';
import { useShallow } from 'zustand/react/shallow';

export const usePresenceStore = create<PresenceStore>((set, get) => ({
	socket: null,
	isConnected: false,
	globalOnlineCount: 0,

	onlineFriends: new Set<string>(),
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
				console.log('Received initial online friends list:', friendsList);
				set({
					onlineFriends: new Set(friendsList),
					onlineFriendsCount: friendsList.length,
				});
			});

			socket.on(
				PRESENCE_EVENTS.SEND.STATUS_CHANGE,
				(data: { userId: string; status: 'online' | 'offline' }) => {
					const { onlineFriends } = get();
					console.log('Received status change:', data);
					if (data.status === 'online') {
						if (onlineFriends.has(data.userId)) return;
						set((prev) => {
							const updatedFriends = new Set(prev.onlineFriends);
							updatedFriends.add(data.userId);
							return {
								onlineFriends: updatedFriends,
								onlineFriendsCount: prev.onlineFriendsCount + 1,
							};
						});
						return;
					}
					set((prev) => {
						const updatedFriends = new Set(prev.onlineFriends);
						updatedFriends.delete(data.userId);
						return {
							onlineFriends: updatedFriends,
							onlineFriendsCount: prev.onlineFriendsCount - 1,
						};
					});
				},
			);
		},

		disconnectPresence: () => {
			const { socket } = get();
			if (socket) {
				socket.disconnect();
				set({
					socket: null,
					isConnected: false,
					onlineFriends: new Set<string>(),
					onlineFriendsCount: 0,
					globalOnlineCount: 0,
				});
			}
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
