import { InfiniteData, QueryClient } from '@tanstack/react-query';
import { CursorResponse } from './types';

const updateInfiniteQuery = <T>(
	queryClient: QueryClient,
	queryKey: unknown[],
	predicate: (item: T) => boolean,
) => {
	queryClient.setQueryData<InfiniteData<CursorResponse<T[]>>>(queryKey, (oldData) => {
		if (!oldData) return oldData;

		return {
			...oldData,
			pages: oldData.pages.map((page) => ({
				...page,
				data: page.data.filter(predicate),
			})),
		};
	});
};

export { updateInfiniteQuery };
