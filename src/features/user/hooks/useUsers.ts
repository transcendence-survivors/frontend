import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeedUsers, getUsers } from '../api/get';
import { GetUserFeedParams, GetUsersParams, UserOrderBy } from '../type';

export type UseUsersParams = {
	orderBy?: UserOrderBy;
	search?: string;
} & GetUserFeedParams;

const initialUserParams = {
	orderBy: 'created-desc',
	limit: 25,
} satisfies Omit<GetUsersParams, 'search'>;

const useUsers = ({ orderBy, search, feedParams }: UseUsersParams) => {
	return useInfiniteQuery({
		queryKey: ['users', { search, feedParams, orderBy }],
		initialPageParam: {
			...initialUserParams,
			orderBy,
			search,
		},
		queryFn: ({ pageParam }) => {
			if (feedParams) {
				return getFeedUsers({
					...pageParam,
					feed: feedParams.feed,
				});
			}
			return getUsers(pageParam);
		},
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.meta.nextCursor!,
			};
		},
	});
};

export { useUsers };
