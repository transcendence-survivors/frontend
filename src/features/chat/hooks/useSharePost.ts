import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { SharePostPayload, sharePostRequest } from '../api/message';
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries';
import { toast } from 'sonner';

export function useSharePost(postId: string) {
	const t = useTranslations('chat.share');
	const { invalidate } = useInvalidateQueries();

	return useMutation({
		mutationFn: (payload: Omit<SharePostPayload, 'postId'>) =>
			sharePostRequest({ ...payload, postId }),
		onSuccess: (data) => {
			const successCount = data.successfulRoomIds.length;
			const failCount = data.failedRoomIds.length;

			if (successCount > 0) {
				toast.success(t('success_count', { count: successCount }));
				invalidate(['chat-rooms'], { mode: 'instant', reset: true });
				for (const roomId of data.successfulRoomIds) {
					invalidate(['chat-messages', roomId], {
						mode: 'instant',
						reset: true,
					});
				}
			}

			if (failCount > 0) {
				toast.error(t('partial_count', { count: failCount }));
			}
		},
		onError: () => {
			toast.error(t('error'));
		},
	});
}
