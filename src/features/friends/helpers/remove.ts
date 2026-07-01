import { InfiniteData, QueryClient } from '@tanstack/react-query';
import { CursorResponse } from '@/libs/api/helpers/types';

type HasId = {
	id?: string;
	friend?: { id: string };
};

const removeFromInfiniteQuery = <T extends HasId>(
	queryClient: QueryClient,
	queryKey: unknown[],
	matchId: string,
) => {
	queryClient.setQueryData<InfiniteData<CursorResponse<T[]>>>(queryKey, (oldData) => {
		if (!oldData) return oldData;

		return {
			...oldData,
			pages: oldData.pages.map((page) => {
				const filtered = page.data.filter(
					(item) => item.id !== matchId && item.friend?.id !== matchId,
				);

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
	});
};

export { removeFromInfiniteQuery };
