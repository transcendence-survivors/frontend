import { StateCreator } from 'zustand';
import { SocketSlice } from '@/modules/websocket/stores/socketSlice';
import { PRESENCE_EVENTS, PresenceEmitEvent } from '../constants/events';
import { PresenceStatus } from '../types/status';
import {
	PresenceFriend,
	PresenceFriendConnectedPayload,
	PresenceFriendStatusChangePayload,
	PresenceInitialFriendsPayload,
} from '../types/events';
import { toast } from 'sonner';
import { PresenceToast } from '../components/PresenceToast';
import { emit } from '@/modules/websocket/helpers/emit';

export interface PresenceSliceState {
	status: PresenceStatus;
	globalOnlineCount: number;
	onlineFriends: Map<string, PresenceFriend>;
	onlineFriendsCount: number;
}

export interface PresenceSliceActions {
	initPresenceListeners: () => void;
	cleanupPresenceListeners: () => void;

	goStatus: (status: Exclude<PresenceStatus, PresenceStatus.OFFLINE>) => Promise<void>;

	isFriendOnline: (friendId: string) => boolean;
	getFriendStatus: (friendId: string) => Exclude<PresenceStatus, 'INVISIBLE'>;
}

export type PresenceSlice = PresenceSliceState & {
	presenceActions: PresenceSliceActions;
};

const statusEventMap = {
	[PresenceStatus.ONLINE]: PRESENCE_EVENTS.SEND.GO_VISIBLE,
	[PresenceStatus.DO_NOT_DISTURB]: PRESENCE_EVENTS.SEND.GO_DO_NOT_DISTURB,
	[PresenceStatus.INVISIBLE]: PRESENCE_EVENTS.SEND.GO_INVISIBLE,
} satisfies Record<Exclude<PresenceStatus, PresenceStatus.OFFLINE>, PresenceEmitEvent>;

export const createPresenceSlice: StateCreator<
	SocketSlice & PresenceSlice,
	[],
	[],
	PresenceSlice
> = (set, get) => {
	let onGlobalCountHandler: ((data: { count: number }) => void) | null = null;
	let onInitialStatusHandler: ((data: { status: PresenceStatus }) => void) | null =
		null;
	let onInitialFriendsHandler:
		((payload: PresenceInitialFriendsPayload) => void) | null = null;
	let onConnectedHandler: ((payload: PresenceFriendConnectedPayload) => void) | null =
		null;
	let onStatusChangeHandler:
		((payload: PresenceFriendStatusChangePayload) => void) | null = null;

	return {
		status: PresenceStatus.ONLINE,
		globalOnlineCount: 0,
		onlineFriendsCount: 0,
		onlineFriends: new Map<string, PresenceFriend>(),

		presenceActions: {
			initPresenceListeners: () => {
				const socket = get().socket;
				if (!socket) return;

				get().presenceActions.cleanupPresenceListeners();

				onGlobalCountHandler = ({ count }: { count: number }) => {
					set({ globalOnlineCount: count });
				};

				onInitialStatusHandler = ({ status }: { status: PresenceStatus }) => {
					set({ status });
				};

				onInitialFriendsHandler = ({
					friends,
				}: PresenceInitialFriendsPayload) => {
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
				};

				onConnectedHandler = (payload: PresenceFriendConnectedPayload) => {
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
				};

				onStatusChangeHandler = ({
					id,
					status,
				}: PresenceFriendStatusChangePayload) => {
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
				};

				socket.on(PRESENCE_EVENTS.RECEIVE.GLOBAL_COUNT, onGlobalCountHandler);
				socket.on(PRESENCE_EVENTS.RECEIVE.INITIAL_STATUS, onInitialStatusHandler);
				socket.on(
					PRESENCE_EVENTS.RECEIVE.INITIAL_FRIENDS,
					onInitialFriendsHandler,
				);
				socket.on(PRESENCE_EVENTS.RECEIVE.CONNECTED, onConnectedHandler);
				socket.on(PRESENCE_EVENTS.RECEIVE.STATUS_CHANGE, onStatusChangeHandler);
			},

			cleanupPresenceListeners: () => {
				const socket = get().socket;
				if (!socket) return;

				if (onGlobalCountHandler) {
					socket.off(
						PRESENCE_EVENTS.RECEIVE.GLOBAL_COUNT,
						onGlobalCountHandler,
					);
					onGlobalCountHandler = null;
				}
				if (onInitialStatusHandler) {
					socket.off(
						PRESENCE_EVENTS.RECEIVE.INITIAL_STATUS,
						onInitialStatusHandler,
					);
					onInitialStatusHandler = null;
				}
				if (onInitialFriendsHandler) {
					socket.off(
						PRESENCE_EVENTS.RECEIVE.INITIAL_FRIENDS,
						onInitialFriendsHandler,
					);
					onInitialFriendsHandler = null;
				}
				if (onConnectedHandler) {
					socket.off(PRESENCE_EVENTS.RECEIVE.CONNECTED, onConnectedHandler);
					onConnectedHandler = null;
				}
				if (onStatusChangeHandler) {
					socket.off(
						PRESENCE_EVENTS.RECEIVE.STATUS_CHANGE,
						onStatusChangeHandler,
					);
					onStatusChangeHandler = null;
				}

				set({
					onlineFriends: new Map<string, PresenceFriend>(),
					onlineFriendsCount: 0,
					globalOnlineCount: 0,
				});
			},

			goStatus: async (
				newStatus: Exclude<PresenceStatus, PresenceStatus.OFFLINE>,
			) => {
				const { socket, status } = get();
				if (!socket?.connected) return;
				if (status === newStatus) return;

				try {
					await emit<void>({
						socket,
						event: statusEventMap[newStatus],
					});
					set({ status: newStatus });
				} catch {}
			},

			isFriendOnline: (friendId: string) => {
				const { onlineFriends } = get();
				return onlineFriends.has(friendId);
			},

			getFriendStatus: (friendId: string) => {
				const { onlineFriends } = get();
				const friend = onlineFriends.get(friendId);
				return friend
					? friend.status === PresenceStatus.INVISIBLE
						? PresenceStatus.OFFLINE
						: friend.status
					: PresenceStatus.OFFLINE;
			},
		},
	};
};
