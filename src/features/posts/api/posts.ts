import { api } from '@/libs/api/api';

import type { UserSession } from '@/features/posts/hook/usePosts';

export async function fetchPosts(page: number, limit: number) {
	const res = await api.get<UserSession>(`/posts?page=${page}&limit=${limit}`);
}
