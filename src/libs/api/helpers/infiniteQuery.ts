import { InfiniteData, QueryClient } from '@tanstack/react-query';
import { CursorPaginationResponse } from './types';

const updateInfiniteQuery = <T>(
	queryClient: QueryClient,
	queryKey: unknown[],
	predicate: (item: T) => boolean,
) => {
	queryClient.setQueryData<InfiniteData<CursorPaginationResponse<T[]>>>(
		queryKey,
		(oldData) => {
			if (!oldData) return oldData;

			return {
				...oldData,
				pages: oldData.pages.map((page) => ({
					...page,
					data: page.data.filter(predicate),
				})),
			};
		},
	);
};

export { updateInfiniteQuery };
