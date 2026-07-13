import { BaseUser } from '@/features/user/type';

interface Post {
	id: string;
	createdAt: Date;
	content?: string;
	imageUrl?: string;
	author: BaseUser;
	likeCount: number;
	isLiked: boolean;
	parentPostId?: string;
	commentCount: number;
}

export type { Post };
