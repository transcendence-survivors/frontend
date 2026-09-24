import { api, isApiError } from '..';

interface PresignedUpload {
	uploadUrl: string;
	publicUrl: string;
}

type Bucket = 'user' | 'chat' | 'post';

const bucketUrlMap: Record<Bucket, string> = {
	user: 'user-presign',
	chat: 'chat-presign',
	post: 'post-presign',
};

const getPresignedUrls = async (
	files: File[],
	bucket: Bucket,
): Promise<PresignedUpload[]> => {
	const filesBody = files.map((file) => ({
		fileName: file.name,
		mimeType: file.type,
	}));

	const res = await api.post<{ files: PresignedUpload[] }>(
		`uploads/${bucketUrlMap[bucket]}`,
		{
			files: filesBody,
		},
	);
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

export const uploadAttachments = async (
	files: File[],
	bucket: Bucket,
): Promise<string[]> => {
	if (!files.length) {
		return [];
	}
	const presigned = await getPresignedUrls(files, bucket);
	return uploadFiles(files, presigned);
};
