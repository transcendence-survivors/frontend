import { api, isApiError } from '@/libs/api';
import { LIKE_ENDPOINTS } from '../constants/endpoint';
import { LikeInfo } from '../types/likes';

export async function addLike(postId: string) {
	const res = await api.post(LIKE_ENDPOINTS.likes(postId));
	if (isApiError(res)) throw Error(res.message);
	return res;
}

export async function deleteLike(postId: string) {
	const res = await api.delete(LIKE_ENDPOINTS.likes(postId));
	if (isApiError(res)) throw Error(res.message);
	return res;
}

export async function fetchLikeInfo(postId: string) {
	const res = await api.get<LikeInfo>(LIKE_ENDPOINTS.likes(postId));
	if (isApiError(res)) throw Error(res.message);
	return res;
}
