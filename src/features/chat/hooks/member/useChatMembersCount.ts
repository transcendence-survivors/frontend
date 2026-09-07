import { useQuery } from '@tanstack/react-query';
import { getChatMembersCount } from '../../api/member';

interface UseChatMembersCountParams {
	roomId: string;
	search?: string;
}

export const useChatMembersCount = ({ roomId, search }: UseChatMembersCountParams) => {
	return useQuery({
		queryKey: ['chat-members-count', { roomId, search }],
		queryFn: () => getChatMembersCount(roomId, { search }),
		enabled: Boolean(roomId),
	});
};
