import { InfiniteData, QueryClient } from '@tanstack/react-query';
import { CursorResponse } from './types';

type UpdateInfiniteQueryOptions<T> =
	| { type: 'map'; callback: (item: T) => T }
	| { type: 'filter'; callback: (item: T) => boolean }
	| { type: 'append'; item: T };

export const updateInfiniteQuery = <T>(
	queryClient: QueryClient,
	queryKey: unknown[],
	options: UpdateInfiniteQueryOptions<T>,
) => {
	queryClient.setQueryData<InfiniteData<CursorResponse<T[]>>>(queryKey, (oldData) => {
		if (!oldData) return oldData;

		const updatePage = (page: CursorResponse<T[]>) => {
			switch (options.type) {
				case 'map':
					return { ...page, data: page.data.map(options.callback) };
				case 'filter':
					return { ...page, data: page.data.filter(options.callback) };
				case 'append':
					return { ...page, data: [options.item, ...page.data] };
			}
		};

		return {
			...oldData,
			pages: oldData.pages.map((page, index) =>
				options.type === 'append' && index !== 0 ? page : updatePage(page),
			),
		};
	});
};
