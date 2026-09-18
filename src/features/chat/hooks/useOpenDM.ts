import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { getOrCreateDirectRoom } from '../api/rooms';
import { ROUTES } from '@/modules/i18n/constants/routes';
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries';

export const useOpenDM = (targetUserId: string) => {
	const router = useRouter();
	const { invalidate } = useInvalidateQueries();

	return useMutation({
		mutationKey: ['chat-rooms', 'open-direct', targetUserId],
		mutationFn: () => getOrCreateDirectRoom(targetUserId),
		onSuccess: (room) => {
			invalidate(['chat-rooms'], { mode: 'instant' });
			router.push(ROUTES.chatId({ id: room.id }));
			router.refresh();
		},
	});
};
