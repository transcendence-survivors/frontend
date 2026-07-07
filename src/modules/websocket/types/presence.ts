import { type Socket } from 'socket.io-client';
import { Friend } from './friend';

interface PresencePublicState {
	socket: Socket | null;
	isConnected: boolean;
	globalOnlineCount: number;

	onlineFriends: Map<string, Friend>;
	onlineFriendsCount: number;
}

interface PresencePublicActions {
	initPresence: () => void;
	disconnectPresence: () => void;
	goInvisible: () => void;
	goVisible: () => void;
	goDoNotDisturb: () => void;
	isFriendOnline: (friendId: string) => boolean;
	getFriendStatus: (friendId: string) => PresenceStatus | null;
}

interface PresenceStoreInternal {}

interface PresenceStore extends PresencePublicState {
	actions: PresencePublicActions;
	internal: PresenceStoreInternal;
}

enum PresenceStatus {
	ONLINE = 'online',
	OFFLINE = 'offline',
	DO_NOT_DISTURB = 'do_not_disturb',
	INVISIBLE = 'invisible',
}

export { PresenceStatus };
export type { PresencePublicState, PresencePublicActions, PresenceStore };
