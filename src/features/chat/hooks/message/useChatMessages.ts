import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { GetChatMessagesParams } from '../../types/message';
import { getChatMessages } from '../../api/message';

interface UseChatMessagesParams {
	roomId: string;
}

const initialChatMessagesParam = {
	limit: 100,
	orderBy: 'created-desc',
} satisfies GetChatMessagesParams;

export const chatMessagesQueryOptions = (roomId: string) =>
	infiniteQueryOptions({
		queryKey: ['chat-messages', roomId],
		initialPageParam: initialChatMessagesParam,
		queryFn: ({ pageParam }) => getChatMessages(roomId, pageParam),
		getNextPageParam: (lastPage) => {
			if (!lastPage.meta.hasNextPage) return undefined;
			return {
				...initialChatMessagesParam,
				cursor: lastPage.meta.nextCursor,
			};
		},
	});

export const useChatMessages = ({ roomId }: UseChatMessagesParams) => {
	return useInfiniteQuery(chatMessagesQueryOptions(roomId));
};
