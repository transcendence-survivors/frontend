import { api } from '@/libs/api/api';

import type { UserSession } from '@/features/posts/hook/usePosts';

export function fetchPosts(page: number, limit: number) {
	return api.get<UserSession>(`/posts?page=${page}&limit=${limit}`);
}
