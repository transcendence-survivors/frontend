import { useInfiniteQuery } from '@tanstack/react-query';
import { type FetchPostParams, fetchPosts } from '../api/posts';

const initialPageParam = {
	limit: 20,
	orderBy: 'date-desc',
} satisfies FetchPostParams;

export function usePosts() {
	return useInfiniteQuery({
		queryKey: ['posts'],
		initialPageParam: { ...initialPageParam },
		queryFn: ({ pageParam }) => fetchPosts(pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.data.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.data.meta.nextCursor,
			};
		},
	});
}
