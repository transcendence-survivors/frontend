import { api, CursorParams, CursorResponse, isApiError } from '@/libs/api';

import { POST_ENDPOINTS } from '../constants/endpoints';
import { Post } from '../types/post';

type FetchPostResponse = CursorResponse<Post[]>;

export type FetchPostParams = CursorParams<'date-asc' | 'date-desc'>;
export async function fetchPosts(
	parentPostId: string | undefined,
	{ cursor, limit, orderBy, search }: FetchPostParams,
) {
	const urlParams = new URLSearchParams();
	if (cursor) urlParams.append('cursor', cursor);
	if (limit) urlParams.append('limit', limit.toString());
	if (orderBy) urlParams.append('orderBy', orderBy);
	if (search) urlParams.append('search', search);

	const path = parentPostId
		? `${POST_ENDPOINTS.getPost}/${parentPostId}/replies`
		: POST_ENDPOINTS.getPost;

	const res = await api.get<FetchPostResponse>(`${path}?${urlParams.toString()}`);
	if (isApiError(res)) throw Error(res.message);
	return res;
}

export async function fetchUserComments(
	username: string,
	{ cursor, limit, orderBy, search }: FetchPostParams,
) {
	const urlParams = new URLSearchParams();
	if (cursor) urlParams.append('cursor', cursor);
	if (limit) urlParams.append('limit', limit.toString());
	if (orderBy) urlParams.append('orderBy', orderBy);
	if (search) urlParams.append('search', search);

	const res = await api.get<FetchPostResponse>(
		`${POST_ENDPOINTS.getPost}/user/${username}/comments?${urlParams.toString()}`,
	);
	if (isApiError(res)) throw Error(res.message);
	return res;
}

export async function createPost(
	content?: string,
	file?: File,
	parentPostId?: string,
	quotedPostId?: string,
) {
	const formData = new FormData();
	if (content) formData.append('content', content);
	if (file) formData.append('file', file);
	if (parentPostId) formData.append('parentPostId', parentPostId);
	if (quotedPostId) formData.append('quotedPostId', quotedPostId);

	const res = await api.postForm<Post>(POST_ENDPOINTS.getPost, formData);
	if (isApiError(res)) throw Error(res.message);
	return res;
}

export async function deletePost(postId: string) {
	const res = await api.delete(`${POST_ENDPOINTS.getPost}/${postId}`);
	if (isApiError(res)) throw Error(res.message);
	return res;
}

export async function getPostById(postId: string) {
	return api.get<Post>(`${POST_ENDPOINTS.getPost}/${postId}`);
}
