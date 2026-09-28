import { BaseUser } from '@user/type';

export interface BaseFriendship {
	id: string;
	since: Date;
	friend: BaseUser;
}

export type Friendship = BaseFriendship &
	({ status: 'ACCEPTED' } | { status: 'PENDING' });

export enum RelationshipStatus {
	BLOCKED_BY_YOU = 'BLOCKED_BY_YOU',
	BLOCKED_BY_THEM = 'BLOCKED_BY_THEM',
	MUTUAL_BLOCK = 'MUTUAL_BLOCK',
	FRIENDS = 'FRIENDS',
	REQUEST_SENT = 'REQUEST_SENT',
	REQUEST_RECEIVED = 'REQUEST_RECEIVED',
	NONE = 'NONE',
}

export interface RelationshipStatusResponse {
	id: string;
	username: string;
	displayName: string;
	status: RelationshipStatus;
}
