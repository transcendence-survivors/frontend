import { BaseUser } from '@/features/user/type';

interface Post {
	id: string;
	createdAt: Date;
	content?: string;
	author: BaseUser;
}

export type { Post };
