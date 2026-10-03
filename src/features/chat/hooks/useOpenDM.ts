'use client';

import { useRouter } from '@/modules/i18n/utils/navigation';
import { useMutation } from '@tanstack/react-query';
import { getOrCreateDirectRoom } from '../api/rooms';
import { ROUTES } from '@/modules/i18n/constants/routes';
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export const useOpenDM = (targetUserId: string) => {
	const router = useRouter();
	const { invalidate } = useInvalidateQueries();
	const t = useTranslations('chat');

	return useMutation({
		mutationKey: ['chat-rooms', 'open-direct', targetUserId],
		mutationFn: () => getOrCreateDirectRoom(targetUserId),
		onError: () => {
			toast.error(t('open_dm_failed'));
		},
		onSuccess: (room) => {
			invalidate(['chat-rooms'], { mode: 'instant' });
			router.push(ROUTES.chatId({ id: room.id }));
			router.refresh();
		},
	});
};
