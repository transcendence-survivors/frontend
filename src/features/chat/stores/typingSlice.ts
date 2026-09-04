import { StateCreator } from 'zustand';
import { SocketState } from '@/modules/websocket/types/socket';
import { CHAT_EVENTS } from '../constants/events';
import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { useShallow } from 'zustand/react/shallow';
import { emit } from '@/modules/websocket/helpers/emit';

interface TypingPayload {
	userId: string;
	displayName: string;
	roomId: string;
	isTyping: boolean;
}

interface TypingUser {
	id: string;
	displayName: string;
}

export interface TypingSlice {
	typingUsersByRoom: Record<string, Record<string, TypingUser>>;
	typingActions: {
		initTypingListeners: () => void;
		destroyTypingListeners: () => void;
		startTyping: (roomId: string) => void;
		stopTyping: (roomId: string) => void;
	};
}

type TimeoutTimer = ReturnType<typeof setTimeout> | null;

const TYPING_DEBOUNCE_MS = 500;
const TYPING_AUTO_STOP_MS = 3000;

export const createTypingSlice: StateCreator<
	SocketState & TypingSlice,
	[],
	[],
	TypingSlice
> = (set, get) => {
	let debounceTimer: TimeoutTimer = null;
	let autoStopTimer: TimeoutTimer = null;

	return {
		typingUsersByRoom: {},
		typingActions: {
			initTypingListeners() {
				const socket = get().socket;
				if (!socket) return;
				get().typingActions.destroyTypingListeners();

				socket.on(
					CHAT_EVENTS.RECEIVE.TYPING_UPDATE,
					({ userId, displayName, roomId, isTyping }: TypingPayload) => {
						set((state) => {
							const roomTypingMap = {
								...(state.typingUsersByRoom[roomId] ?? {}),
							};

							if (isTyping) {
								roomTypingMap[userId] = {
									id: userId,
									displayName,
								};
							} else delete roomTypingMap[userId];

							return {
								typingUsersByRoom: {
									...state.typingUsersByRoom,
									[roomId]: roomTypingMap,
								},
							};
						});
					},
				);
			},

			destroyTypingListeners() {
				const socket = get().socket;
				if (socket) {
					socket.off(CHAT_EVENTS.RECEIVE.TYPING_UPDATE);
				}
				if (debounceTimer) clearTimeout(debounceTimer);
				if (autoStopTimer) clearTimeout(autoStopTimer);
			},

			async startTyping(roomId) {
				const socket = get().socket;
				if (!socket) return;

				if (!debounceTimer) {
					await emit<void>({
						event: CHAT_EVENTS.SEND.TYPING_START,
						socket,
						payload: { roomId },
					});
				} else clearTimeout(debounceTimer);

				debounceTimer = setTimeout(
					() => (debounceTimer = null),
					TYPING_DEBOUNCE_MS,
				);

				if (autoStopTimer) clearTimeout(autoStopTimer);

				autoStopTimer = setTimeout(() => {
					get().typingActions.stopTyping(roomId);
				}, TYPING_AUTO_STOP_MS);
			},

			async stopTyping(roomId) {
				const socket = get().socket;
				if (!socket) return;

				if (debounceTimer) {
					clearTimeout(debounceTimer);
					debounceTimer = null;
				}
				if (autoStopTimer) {
					clearTimeout(autoStopTimer);
					autoStopTimer = null;
				}

				await emit<void>({
					event: CHAT_EVENTS.SEND.TYPING_STOP,
					socket,
					payload: { roomId },
				});
			},
		},
	};
};

export const useTypingActions = () => {
	return useWebsocketStore(
		useShallow((state) => ({
			initTypingListeners: state.typingActions.initTypingListeners,
			destroyTypingListeners: state.typingActions.destroyTypingListeners,
			startTyping: state.typingActions.startTyping,
			stopTyping: state.typingActions.stopTyping,
		})),
	);
};

export const useTypingUsers = (roomId: string): TypingUser[] => {
	return useWebsocketStore(
		useShallow((state) => {
			const roomMap = state.typingUsersByRoom[roomId];
			if (!roomMap) return [];
			return Object.values(roomMap);
		}),
	);
};
