'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getChatRooms } from '../../api/rooms';
import { ChatRoomOrderBy, GetChatRoomSearchParams } from '../../types/room';

const initialChatRoomsParam = {
	limit: 20,
	orderBy: ChatRoomOrderBy.UPDATED_DESC,
} satisfies GetChatRoomSearchParams;

export type UseChatRoomsParams = Omit<GetChatRoomSearchParams, 'cursor' | 'limit'>;

export const useChatRooms = (params: UseChatRoomsParams) => {
	return useInfiniteQuery({
		queryKey: ['chat-rooms', params],
		initialPageParam: { ...initialChatRoomsParam, ...params },
		queryFn: ({ pageParam }) => getChatRooms(pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.meta.nextCursor,
			};
		},
	});
};
