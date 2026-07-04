import { BaseUser } from '@/features/user/type';

interface Post {
	id: string;
	createdAt: Date;
	content?: string;
	imageUrl?: string;
	author: BaseUser;
}

export type { Post };
