import { BaseUser } from '@/features/user/type';

interface Post {
	id: string;
	createdAt: Date;
	content?: string;
	imageUrl?: string;
	author: BaseUser;
	likeCount: number;
	isLiked: boolean;
	repostCount: number;
	isReposted: boolean;
	parentPostId?: string;
	parent?: {
		content?: string;
		author: BaseUser;
	};
	quotedPostId?: string;
	quotedPost?: {
		content?: string;
		author: BaseUser;
	};
	commentCount: number;
}

export type { Post };
