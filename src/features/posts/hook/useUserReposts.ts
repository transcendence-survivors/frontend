import { useInfiniteQuery } from '@tanstack/react-query';
import { type FetchPostParams, fetchUserReposts } from '../api/posts';

const initialPageParam = {
	limit: 20,
	orderBy: 'date-desc',
} satisfies FetchPostParams;

export function useUserReposts(username: string) {
	return useInfiniteQuery({
		queryKey: ['userReposts', username],
		initialPageParam: { ...initialPageParam },
		queryFn: ({ pageParam }) => fetchUserReposts(username, pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.data.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.data.meta.nextCursor,
			};
		},
	});
}
