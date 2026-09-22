'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getChatRooms } from '../../api/rooms';
import { ChatRoomOrderBy, GetChatRoomSearchParams } from '../../types/room';
import { useCurrentRoomId, useNotificationActions } from '../../stores/notificationSlice';
import { useEffect } from 'react';

const initialChatRoomsParam = {
	limit: 20,
	orderBy: ChatRoomOrderBy.ACTIVITY_ASC,
} satisfies GetChatRoomSearchParams;

export type UseChatRoomsParams = Omit<GetChatRoomSearchParams, 'cursor' | 'limit'>;

export const useChatRooms = (params: UseChatRoomsParams) => {
	const currentRoomId = useCurrentRoomId();
	const { mergeRoomUnreadCounts } = useNotificationActions();

	const query = useInfiniteQuery({
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

	useEffect(() => {
		if (!query.data) return;

		const roomCounts: Record<string, number> = {};

		query.data.pages.forEach((page) => {
			page.data.forEach((room) => {
				if (room.id !== currentRoomId) {
					roomCounts[room.id] = room.unreadCount ?? 0;
				}
			});
		});

		if (Object.keys(roomCounts).length > 0) {
			mergeRoomUnreadCounts(roomCounts);
		}
	}, [query.data, currentRoomId, mergeRoomUnreadCounts]);

	return query;
};
