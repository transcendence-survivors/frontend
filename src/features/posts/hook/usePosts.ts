import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/posts';
import type { ApiResponse } from '@/libs/api';
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';

export const POST_ORDER_BY = ['date-asc', 'date-desc'] as const;

export type OrderBy = (typeof POST_ORDER_BY)[number];

export type Post = {
	id: string;
	content: string;
	authorId: string;
	createdAt: string;
	updatedAt: string;
	author: {
		id: string;
		username: string;
		displayName: string;
		avatarUrl: string;
	};
};

export type UserSession = {
	page: number;
	limit: number;
	orderBy?: OrderBy;
	post: Array<Post>;
};

export function usePosts(page = 1, limit = 10) {
	return useQuery({
		queryKey: ['posts', page, limit],
		queryFn: () => fetchPosts(page, limit),
	});
}
