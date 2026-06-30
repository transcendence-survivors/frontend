import { PresenceStatus } from './presence';

interface FriendStatusChangePayload {
	userId: string;
	status: PresenceStatus;
}

interface Friend {
	status: PresenceStatus;
}

export type { FriendStatusChangePayload, Friend };
