import { useInfiniteQuery } from '@tanstack/react-query';
import { type FetchPostParams, type PostFeed, fetchPosts } from '../api/posts';
import { postKeys } from '../constants/query-keys';

const initialPageParam = {
	limit: 20,
	orderBy: 'date-desc',
} satisfies FetchPostParams;

export function usePosts(parentPostId?: string, search?: string, feed?: PostFeed) {
	return useInfiniteQuery({
		queryKey: postKeys.feed(parentPostId, search, feed),
		initialPageParam: { ...initialPageParam, search, feed },
		queryFn: ({ pageParam }) => fetchPosts(parentPostId, pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.data.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.data.meta.nextCursor,
			};
		},
	});
}
