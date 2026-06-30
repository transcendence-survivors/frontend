import { api, isApiError } from '@/libs/api';

import { POST_ENDPOINTS } from '../constants/endpoints';
import { Post } from '../types/post';
import { PaginationResponse } from '@/libs/api/helpers/types';

export async function fetchPosts(page: number, limit: number) {
	const res = await api.get<PaginationResponse<Post[]>>(`${POST_ENDPOINTS.getPost}`);
	if (isApiError(res)) throw Error(res.message);
	return res;
}
