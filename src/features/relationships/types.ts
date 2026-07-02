import { BaseUser } from '@user/type';

interface BaseFriendship {
	id: string;
	since: Date;
	friend: BaseUser;
}

export type { BaseFriendship };
