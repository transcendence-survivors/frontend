import { BaseUser } from '../user/type';

interface BaseFriendship {
	id: string;
	since: Date;
	friend: BaseUser;
}

interface FriendRequest extends BaseFriendship {
	status: 'PENDING';
}

interface Friend extends BaseFriendship {
	status: 'ACCEPTED';
}

export type { FriendRequest, Friend };
