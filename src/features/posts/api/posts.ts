import { api } from '@/libs/api/api';

export function fetchPosts(page: number, limit: number) {
	return api.get(`/v1/posts?page=${page}&limit=${limit}`);
}
