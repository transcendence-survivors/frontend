import {
	api,
	buildUrlParams,
	CursorParams,
	CursorResponse,
	isApiError,
} from '@/libs/api';

import { POST_ENDPOINTS } from '../constants/endpoints';
import { Post } from '../types/post';
import { uploadAttachments } from '@/libs/api/helpers/attachments';

type FetchPostResponse = CursorResponse<Post[]>;

export type PostFeed = 'friends' | 'all-not-blocked';

export type FetchPostParams = CursorParams<'date-asc' | 'date-desc'> & {
	feed?: PostFeed;
};

export async function fetchPosts(
	parentPostId: string | undefined,
	params: FetchPostParams,
) {
	const urlParams = buildUrlParams(params);
	const path = parentPostId
		? `${POST_ENDPOINTS.getReplies(parentPostId)}`
		: POST_ENDPOINTS.getPosts;

	const res = await api.get<FetchPostResponse>(`${path}?${urlParams.toString()}`);
	if (isApiError(res)) throw Error(res.message);
	return res;
}

export async function fetchUserComments(username: string, params: FetchPostParams) {
	const urlParams = buildUrlParams(params);
	const res = await api.get<FetchPostResponse>(
		`${POST_ENDPOINTS.getUserComments(username)}?${urlParams.toString()}`,
	);

	if (isApiError(res)) throw Error(res.message);
	return res;
}

export async function fetchUserReposts(username: string, params: FetchPostParams) {
	const urlParams = buildUrlParams(params);
	const res = await api.get<FetchPostResponse>(
		`${POST_ENDPOINTS.getUserReposts(username)}?${urlParams.toString()}`,
	);

	if (isApiError(res)) throw Error(res.message);
	return res;
}

export async function fetchUserLikes(username: string, params: FetchPostParams) {
	const urlParams = buildUrlParams(params);
	const res = await api.get<FetchPostResponse>(
		`${POST_ENDPOINTS.getUserLikes(username)}?${urlParams.toString()}`,
	);

	if (isApiError(res)) throw Error(res.message);
	return res;
}

export async function fetchUserPosts(username: string, params: FetchPostParams) {
	const urlParams = buildUrlParams(params);
	const res = await api.get<FetchPostResponse>(
		`${POST_ENDPOINTS.getUserPosts(username)}?${urlParams.toString()}`,
	);

	if (isApiError(res)) throw Error(res.message);
	return res;
}

export interface CreatePostPayload {
	content?: string;
	imageUrl?: string;
	parentPostId?: string;
	quotedPostId?: string;
}

export async function createPost(
	content?: string,
	file?: File,
	parentPostId?: string,
	quotedPostId?: string,
) {
	const payload: CreatePostPayload = {
		content,
		parentPostId,
		quotedPostId,
	};

	if (file) {
		const [uploadedUrl] = await uploadAttachments([file], 'post');
		payload.imageUrl = uploadedUrl;
	}

	const res = await api.post<Post>(POST_ENDPOINTS.getPosts, payload);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res;
}

export async function deletePost(postId: string) {
	const res = await api.delete(POST_ENDPOINTS.deletePost(postId));
	if (isApiError(res)) throw Error(res.message);
	return res;
}

export async function getPostById(postId: string, cookie?: string) {
	return api.get<Post>(POST_ENDPOINTS.getPost(postId), {
		headers: cookie ? { Cookie: cookie } : undefined,
	});
}
