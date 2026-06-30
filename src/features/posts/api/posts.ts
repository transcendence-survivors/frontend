import {
	api,
	BaseCursorPaginationParams,
	CursorPaginationResponse,
	isApiError,
} from '@/libs/api';

import { POST_ENDPOINTS } from '../constants/endpoints';
import { Post } from '../types/post';

type FetchPostResponse = CursorPaginationResponse<Post[]>;

export type FetchPostParams = BaseCursorPaginationParams<'date-asc' | 'date-desc'>;
export async function fetchPosts({ cursor, limit, orderBy, search }: FetchPostParams) {
	await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
	const urlParams = new URLSearchParams();
	if (cursor) urlParams.append('cursor', cursor);
	if (limit) urlParams.append('limit', limit.toString());
	if (orderBy) urlParams.append('orderBy', orderBy);
	if (search) urlParams.append('cursor', search);

	const res = await api.get<FetchPostResponse>(
		`${POST_ENDPOINTS.getPost}?${urlParams.toString()}`,
	);
	if (isApiError(res)) throw Error(res.message);
	return res;
}
