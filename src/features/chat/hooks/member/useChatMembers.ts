import { useInfiniteQuery } from '@tanstack/react-query';
import { GetChatMembersParams } from '../../types/member';
import { getChatMembers } from '../../api/member';

export interface UseChatMembersParams {
	roomId: string;
	orderBy: GetChatMembersParams['orderBy'];
	limit: number;
	search?: string;
}

export const useChatMembers = ({
	roomId,
	search,
	orderBy,
	limit,
}: UseChatMembersParams) => {
	const initialPageParam = {
		limit,
		orderBy,
		...(search && { search }),
	} satisfies GetChatMembersParams;

	return useInfiniteQuery({
		queryKey: ['chat-members', { roomId, search, orderBy, limit }],
		initialPageParam,
		queryFn: ({ pageParam }) => getChatMembers(roomId, pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.meta.nextCursor,
			};
		},
	});
};
