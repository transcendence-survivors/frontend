import { useInfiniteQuery } from '@tanstack/react-query';
import { GetChatMessagesParams } from '../types/message';
import { getChatMessages } from '../api/get';

interface UseChatMessagesParams {
	roomId: string;
}

const initialChatMessagesParam = {
	limit: 30,
	orderBy: 'created-desc',
} satisfies GetChatMessagesParams;

export const useChatMessages = ({ roomId }: UseChatMessagesParams) => {
	return useInfiniteQuery({
		queryKey: ['chat-messages', { roomId }],
		initialPageParam: { ...initialChatMessagesParam },
		queryFn: ({ pageParam }) => getChatMessages(roomId, pageParam),
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (!lastPage.meta.hasNextPage) return undefined;

			return {
				...lastPageParam,
				cursor: lastPage.meta.nextCursor,
			};
		},
	});
};
