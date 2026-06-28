import { InfiniteData, QueryClient } from '@tanstack/react-query';
import { CursorPaginationResponse } from './types';

const updateInfiniteQuery = <T>(
	queryClient: QueryClient,
	queryKey: unknown[],
	updater: (item: T) => boolean,
) => {
	queryClient.setQueryData<InfiniteData<CursorPaginationResponse<T[]>>>(
		queryKey,
		(oldData) => {
			if (!oldData) return oldData;

			return {
				...oldData,
				pages: oldData.pages.map((page) => {
					const filtered = page.data.filter(updater);

					return {
						...page,
						data: filtered,
						meta: {
							...page.meta,
							itemsCount: filtered.length,
						},
					};
				}),
			};
		},
	);
};

export { updateInfiniteQuery };
