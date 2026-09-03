'use client';

import { useMutation } from '@tanstack/react-query';
import { useWsChatActions } from './useWsChatActions';
import { toast } from 'sonner';
import { uploadAttachments } from '@/libs/api/helpers/attachments';

interface SendMessageInput {
	roomId: string;
	replyToId?: string;
	content: string;
	files?: File[];
}

export const useSendMessage = () => {
	const { sendMessage } = useWsChatActions();

	return useMutation({
		mutationFn: async ({
			roomId,
			replyToId,
			content,
			files = [],
		}: SendMessageInput) => {
			const attachmentUrls = await uploadAttachments(files);
			return sendMessage({
				roomId,
				replyToId,
				content,
				attachmentUrls,
			});
		},
		onError: () => {
			toast.error('Failed to send message');
		},
	});
};

export const useEditMessage = () => {
	const { editMessage } = useWsChatActions();

	return useMutation({
		mutationFn: async ({
			messageId,
			content,
		}: {
			messageId: string;
			content: string;
		}) => {
			return editMessage({ messageId, content });
		},
		onError: () => {
			toast.error('Failed to edit message');
		},
	});
};

export const useSoftDeleteMessage = () => {
	const { softDeleteMessage } = useWsChatActions();

	return useMutation({
		mutationFn: async (messageId: string) => {
			return softDeleteMessage(messageId);
		},
		onError: () => {
			toast.error('Failed to delete message');
		},
	});
};
