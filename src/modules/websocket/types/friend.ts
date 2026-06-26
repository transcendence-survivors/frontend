interface FriendStatusChangePayload {
	userId: string;
	status: 'online' | 'offline';
}

export type { FriendStatusChangePayload };
