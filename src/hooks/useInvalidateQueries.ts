import {
	invalidateQueries,
	InvalidateQueriesOptions,
} from '@/libs/api/helpers/queryInvalidator';
import { useQueryClient, QueryKey } from '@tanstack/react-query';

export const useInvalidateQueries = () => {
	const queryClient = useQueryClient();

	const invalidate = (queryKey: QueryKey, options?: InvalidateQueriesOptions) => {
		invalidateQueries(queryClient, queryKey, options);
	};

	return {
		invalidate,
		queryClient,
	};
};
