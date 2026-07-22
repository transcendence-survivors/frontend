import { api, isApiError } from '@/libs/api';
import { REPOST_ENDPOINTS } from '../constants/endpoint';
import { RepostInfo } from '../types/reposts';

export async function addRepost(postId: string) {
	const res = await api.post(REPOST_ENDPOINTS.reposts(postId));
	if (isApiError(res)) throw Error(res.message);
	return res;
}

export async function deleteRepost(postId: string) {
	const res = await api.delete(REPOST_ENDPOINTS.reposts(postId));
	if (isApiError(res)) throw Error(res.message);
	return res;
}

export async function fetchRepostInfo(postId: string) {
	const res = await api.get<RepostInfo>(REPOST_ENDPOINTS.reposts(postId));
	if (isApiError(res)) throw Error(res.message);
	return res;
}
