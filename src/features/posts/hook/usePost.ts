import { useQuery } from '@tanstack/react-query';

import { isApiError } from '@/libs/api';

import { getPostById } from '../api/posts';
import { postKeys } from '../constants/query-keys';
import { Post } from '../types/post';

export function usePost(postId: string, initialData: Post) {
	return useQuery({
		queryKey: postKeys.detail(postId),
		initialData,
		queryFn: async () => {
			const res = await getPostById(postId);
			if (isApiError(res)) throw Error(res.message);
			return res.data;
		},
	});
}
