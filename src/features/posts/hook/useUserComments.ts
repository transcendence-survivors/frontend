import { useInfiniteQuery } from '@tanstack/react-query';
import { type FetchPostParams, fetchUserComments } from '../api/posts';

const initialPageParam = {
	limit: 20,
	orderBy: 'date-desc',
} satisfies FetchPostParams;

export function useUserComments(username: string) {
	return useInfiniteQuery({
		queryKey: ['userComments', username],
		initialPageParam: { ...initialPageParam },
		queryFn: ({ pageParam }) => fetchUserComments(username, pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.data.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.data.meta.nextCursor,
			};
		},
	});
}
