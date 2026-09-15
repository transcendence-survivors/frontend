import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrCreateDirectRoom } from '../api/rooms';
import { ROUTES } from '@/modules/i18n/constants/routes';

export const useOpenDM = (targetUserId: string) => {
	const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['chat-rooms', 'open-direct', targetUserId],
		mutationFn: () => getOrCreateDirectRoom(targetUserId),
		onSuccess: (room) => {
			queryClient.invalidateQueries({ queryKey: ['chat-rooms'] });
			router.push(ROUTES.chatId({ id: room.id }));
			router.refresh();
		},
	});
};
