'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { uploadAttachments } from '@/libs/api/helpers/attachments';
import { EditMessagePayload, useMessageActions } from '../../stores/messageSlice';

interface SendMessageInput {
	roomId: string;
	replyToId?: string;
	content: string;
	files?: File[];
}

export const useSendMessage = () => {
	const { sendMessage } = useMessageActions();
	const t = useTranslations('chat.messages.errors');

	return useMutation({
		mutationFn: async ({
			roomId,
			replyToId,
			content,
			files = [],
		}: SendMessageInput) => {
			const attachmentUrls = await uploadAttachments(files, 'chat');
			return sendMessage({
				roomId,
				replyToId,
				content,
				attachmentUrls,
			});
		},
		onError: () => {
			toast.error(t('send'));
		},
	});
};

export const useEditMessage = () => {
	const { editMessage } = useMessageActions();
	const t = useTranslations('chat.messages.errors');

	return useMutation({
		mutationFn: async (payload: EditMessagePayload) => {
			return editMessage(payload);
		},
		onError: () => {
			toast.error(t('edit'));
		},
	});
};

export const useSoftDeleteMessage = () => {
	const { softDeleteMessage } = useMessageActions();
	const t = useTranslations('chat.messages.errors');

	return useMutation({
		mutationFn: async (messageId: string) => {
			return softDeleteMessage(messageId);
		},
		onError: () => {
			toast.error(t('delete'));
		},
	});
};
