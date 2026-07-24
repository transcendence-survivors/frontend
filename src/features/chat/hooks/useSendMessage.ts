'use client';

import { useMutation } from '@tanstack/react-query';
import { useWsChatActions } from './useWsChatActions';
import { api, isApiError } from '@/libs/api';

interface PresignedUpload {
	uploadUrl: string;
	publicUrl: string;
}

interface SendMessageInput {
	roomId: string;
	content: string;
	files?: File[];
}

const getPresignedUrls = async (files: File[]): Promise<PresignedUpload[]> => {
	const filesBody = files.map((file) => ({
		fileName: file.name,
		mimeType: file.type,
	}));

	const res = await api.post<{ files: PresignedUpload[] }>('uploads/chat-presign', {
		files: filesBody,
	});

	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data.files;
};

async function uploadFiles(
	files: File[],
	presigned: PresignedUpload[],
): Promise<string[]> {
	await Promise.all(
		files.map(async (file, index) => {
			const response = await fetch(presigned[index].uploadUrl, {
				method: 'PUT',
				headers: {
					'Content-Type': file.type,
				},
				body: file,
			});

			if (!response.ok) {
				throw new Error(`Failed to upload ${file.name}`);
			}
		}),
	);

	return presigned.map(({ publicUrl }) => publicUrl);
}

async function uploadAttachments(files: File[]): Promise<string[]> {
	if (!files.length) {
		return [];
	}

	const presigned = await getPresignedUrls(files);
	console.log('Presigned URLs:', presigned);
	return uploadFiles(files, presigned);
}

export function useSendMessage() {
	// const { sendMessage } = useWsChatActions();

	return useMutation({
		mutationFn: async ({ roomId, content, files = [] }: SendMessageInput) => {
			const attachmentUrls = await uploadAttachments(files);
			console.log('Attachment URLs:', attachmentUrls);
			// return sendMessage({
			// 	roomId,
			// 	content,
			// 	attachmentUrls,
			// });
		},
		onError: (error) => {
			console.error('Error sending message:', error);
		},
		onSuccess: () => {
			console.log('Message sent successfully');
		},
	});
}
