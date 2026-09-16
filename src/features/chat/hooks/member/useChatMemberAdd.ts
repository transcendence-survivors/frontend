import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMembers } from '../../api/member';

export const useAddChatMembers = (roomId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['chat-add-members', roomId],
		mutationFn: (userIds: string[]) => addMembers(roomId, userIds),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['chat-members', roomId] });
			queryClient.invalidateQueries({ queryKey: ['chat-members-count', roomId] });
			queryClient.invalidateQueries({ queryKey: ['chat-rooms'] });
		},
	});
};
