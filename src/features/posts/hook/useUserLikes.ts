import { useInfiniteQuery } from '@tanstack/react-query';
import { type FetchPostParams, fetchUserLikes } from '../api/posts';

const initialPageParam = {
	limit: 20,
	orderBy: 'date-desc',
} satisfies FetchPostParams;

export function useUserLikes(username: string) {
	return useInfiniteQuery({
		queryKey: ['userLikes', username],
		initialPageParam: { ...initialPageParam },
		queryFn: ({ pageParam }) => fetchUserLikes(username, pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.data.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.data.meta.nextCursor,
			};
		},
	});
}
