import { api, isApiError } from '..';

const IMAGE_MIMES = [
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/avif',
	'image/gif',
	'image/svg+xml',
	'image/bmp',
	'image/x-icon',
	'image/vnd.microsoft.icon',
	'image/tiff',
	'image/heic',
	'image/heif',
] as const;

const VIDEO_MIMES = [
	'video/mp4',
	'video/webm',
	'video/ogg',
	'video/quicktime',
	'video/x-msvideo',
	'video/x-matroska',
	'video/3gpp',
	'video/3gpp2',
	'video/mpeg',
	'video/mp2t',
] as const;

interface PresignedUpload {
	uploadUrl: string;
	publicUrl: string;
}

type Bucket = 'avatar' | 'chat' | 'post';

interface BucketConfig {
	url: string;
	maxSize: number;
	maxSizeMB: number;
	mimes: readonly string[];
	maxFilesCount: number;
}

export const bucketsConfig: Record<Bucket, BucketConfig> = {
	avatar: {
		url: 'avatar-presign',
		maxSize: 5 * 1024 * 1024,
		maxSizeMB: 5,
		mimes: IMAGE_MIMES,
		maxFilesCount: 1,
	},
	chat: {
		url: 'chat-presign',
		maxSize: 50 * 1024 * 1024,
		maxSizeMB: 50,
		mimes: [...IMAGE_MIMES, ...VIDEO_MIMES],
		maxFilesCount: 5,
	},
	post: {
		url: 'post-presign',
		maxSize: 50 * 1024 * 1024,
		maxSizeMB: 50,
		mimes: IMAGE_MIMES,
		maxFilesCount: 1,
	},
};

const getPresignedUrls = async (
	files: File[],
	bucket: Bucket,
): Promise<PresignedUpload[]> => {
	const filesBody = files.map((file) => ({
		mimeType: file.type,
		contentLength: file.size,
	}));

	const res = await api.post<{ files: PresignedUpload[] }>(
		`uploads/${bucketsConfig[bucket].url}`,
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
					'Content-Length': file.size.toString(),
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
