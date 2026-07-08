import { BaseUser } from '@user/type';

interface BaseFriendship {
	id: string;
	since: Date;
	friend: BaseUser;
}

type Friendship = BaseFriendship & ({ status: 'ACCEPTED' } | { status: 'PENDING' });

export type { BaseFriendship, Friendship };
