import { useInfiniteQuery } from '@tanstack/react-query';
import { type FetchPostParams, fetchUserPosts } from '../api/posts';
import { postKeys } from '../constants/query-keys';

const initialPageParam = {
	limit: 20,
	orderBy: 'date-desc',
} satisfies FetchPostParams;

export function useUserPosts(username: string) {
	return useInfiniteQuery({
		queryKey: postKeys.userPosts(username),
		initialPageParam: { ...initialPageParam },
		queryFn: ({ pageParam }) => fetchUserPosts(username, pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.data.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.data.meta.nextCursor,
			};
		},
	});
}
