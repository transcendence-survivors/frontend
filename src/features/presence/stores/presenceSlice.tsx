import { StateCreator } from 'zustand';
import { SocketSlice } from '@/modules/websocket/stores/socketSlice';
import { PRESENCE_EVENTS } from '../constants/events';
import { PresenceStatus } from '../types/status';
import {
	PresenceFriend,
	PresenceFriendConnectedPayload,
	PresenceFriendStatusChangePayload,
	PresenceInitialFriendsPayload,
} from '../types/events';
import { toast } from 'sonner';
import { PresenceToast } from '../components/PresenceToast';

export interface PresenceSlice {
	status: PresenceStatus;
	globalOnlineCount: number;
	onlineFriends: Map<string, PresenceFriend>;

	onlineFriendsCount: number;
	presenceActions: {
		initPresenceListeners: () => void;
		cleanupPresenceListeners: () => void;

		goStatus: (status: PresenceStatus) => void;

		isFriendOnline: (friendId: string) => boolean;
		getFriendStatus: (friendId: string) => PresenceStatus;
	};
}

export const createPresenceSlice: StateCreator<
	SocketSlice & PresenceSlice,
	[],
	[],
	PresenceSlice
> = (set, get) => ({
	status: PresenceStatus.ONLINE,
	globalOnlineCount: 0,
	onlineFriendsCount: 0,
	onlineFriends: new Map<string, PresenceFriend>(),

	presenceActions: {
		initPresenceListeners: () => {
			const { socket } = get();
			if (!socket) return;

			socket.on(
				PRESENCE_EVENTS.RECEIVE.GLOBAL_COUNT,
				({ count }: { count: number }) => {
					set({ globalOnlineCount: count });
				},
			);

			socket.on(
				PRESENCE_EVENTS.RECEIVE.INITIAL_STATUS,
				({ status }: { status: PresenceStatus }) => {
					set({ status });
				},
			);

			socket.on(
				PRESENCE_EVENTS.RECEIVE.INITIAL_FRIENDS,
				({ friends }: PresenceInitialFriendsPayload) => {
					set({
						onlineFriends: new Map(
							friends.map((friend) => [
								friend.id,
								{
									status: friend.status,
									id: friend.id,
								},
							]),
						),
						onlineFriendsCount: friends.length,
					});
				},
			);

			socket.on(
				PRESENCE_EVENTS.RECEIVE.CONNECTED,
				(payload: PresenceFriendConnectedPayload) => {
					const { id, status, username, displayName, avatarUrl } = payload;
					const friend = get().onlineFriends.get(id);

					if (friend) return;

					toast.custom(() => (
						<PresenceToast
							id={id}
							avatarUrl={avatarUrl}
							username={username}
							displayName={displayName}
							status={status}
						/>
					));

					set((prev) => ({
						onlineFriends: new Map(prev.onlineFriends).set(id, {
							status,
							id,
						}),
						onlineFriendsCount: prev.onlineFriendsCount + 1,
					}));
				},
			);

			socket.on(
				PRESENCE_EVENTS.RECEIVE.STATUS_CHANGE,
				({ id, status }: PresenceFriendStatusChangePayload) => {
					const currentFriends = get().onlineFriends;
					const friend = currentFriends.get(id);

					if (friend && friend.status === status) return;

					if (
						status === PresenceStatus.OFFLINE ||
						status === PresenceStatus.INVISIBLE
					) {
						if (!friend) return;
						set((prev) => {
							const newFriends = new Map(prev.onlineFriends);
							newFriends.delete(id);
							return {
								onlineFriends: newFriends,
								onlineFriendsCount: prev.onlineFriendsCount - 1,
							};
						});
						return;
					}

					if (friend) {
						set((prev) => ({
							onlineFriends: new Map(prev.onlineFriends).set(id, {
								status,
								id,
							}),
							onlineFriendsCount: prev.onlineFriendsCount,
						}));
					}
				},
			);
		},

		cleanupPresenceListeners: () => {
			const { socket } = get();
			if (!socket) return;

			socket.off(PRESENCE_EVENTS.RECEIVE.GLOBAL_COUNT);
			socket.off(PRESENCE_EVENTS.RECEIVE.INITIAL_FRIENDS);
			socket.off(PRESENCE_EVENTS.RECEIVE.STATUS_CHANGE);

			set({
				onlineFriends: new Map<string, PresenceFriend>(),
				onlineFriendsCount: 0,
				globalOnlineCount: 0,
			});
		},

		goStatus: (newStatus: Omit<PresenceStatus, PresenceStatus.OFFLINE>) => {
			const { socket, status } = get();
			if (!socket?.connected) return;
			if (status === newStatus) return;
			switch (newStatus) {
				case PresenceStatus.ONLINE:
					socket.emit(PRESENCE_EVENTS.SEND.GO_VISIBLE);
					break;
				case PresenceStatus.DO_NOT_DISTURB:
					socket.emit(PRESENCE_EVENTS.SEND.GO_DO_NOT_DISTURB);
					break;
				case PresenceStatus.INVISIBLE:
					socket.emit(PRESENCE_EVENTS.SEND.GO_INVISIBLE);
					break;
			}
			set({ status: newStatus as PresenceStatus });
		},

		isFriendOnline: (friendId: string) => {
			const { onlineFriends } = get();
			return onlineFriends.has(friendId);
		},
		getFriendStatus: (friendId: string) => {
			const { onlineFriends } = get();
			const friend = onlineFriends.get(friendId);
			return friend ? friend.status : PresenceStatus.OFFLINE;
		},
	},
});
