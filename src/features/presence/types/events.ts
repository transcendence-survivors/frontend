import { BaseUser } from '@/features/user/type';
import { PresenceStatus } from './status';

export interface PresenceFriend {
	id: string;
	status: PresenceStatus;
}
export type PresenceInitialFriendsPayload = PresenceFriend[];

export type PresenceFriendStatusChangePayload = PresenceFriend;
export type PresenceFriendConnectedPayload = PresenceFriend & BaseUser;
