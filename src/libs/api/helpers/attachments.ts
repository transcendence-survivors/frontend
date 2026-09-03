import { api, isApiError } from '..';

interface PresignedUpload {
	uploadUrl: string;
	publicUrl: string;
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

const uploadFiles = async (
	files: File[],
	presigned: PresignedUpload[],
): Promise<string[]> => {
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
};

export const uploadAttachments = async (files: File[]): Promise<string[]> => {
	if (!files.length) {
		return [];
	}
	const presigned = await getPresignedUrls(files);
	return uploadFiles(files, presigned);
};
