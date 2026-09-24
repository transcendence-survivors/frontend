import { useMutation } from '@tanstack/react-query';
import { addMembers } from '../../api/member';

export const useChatMembersAdd = (roomId: string) => {
	return useMutation({
		mutationKey: ['chat-add-members', roomId],
		mutationFn: (userIds: string[]) => addMembers(roomId, userIds),
	});
};
