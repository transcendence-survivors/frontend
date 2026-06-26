import { type Socket } from 'socket.io-client';

interface PresenceState {
	socket: Socket | null;
	isConnected: boolean;
	globalOnlineCount: number;

	onlineFriends: Set<string>;
	onlineFriendsCount: number;
}

interface PresenceActions {
	initPresence: () => void;
	disconnectPresence: () => void;
	goInvisible: () => void;
	goVisible: () => void;
}

interface PresenceStore extends PresenceState {
	actions: PresenceActions;
}

export type { PresenceState, PresenceActions, PresenceStore };
