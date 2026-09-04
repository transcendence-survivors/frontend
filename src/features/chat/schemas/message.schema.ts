import z from 'zod';

export const ACCEPTED_MEDIA_TYPES = ['image/', 'video/'];
export const MAX_FILE_SIZE = 50 * 1024 * 1024;
export const MAX_FILES_COUNT = 5;

export const chatMessageSchema = z
	.object({
		text: z.string().trim(),
		attachments: z
			.array(
				z.custom<File>((val) => val instanceof File, { message: 'Invalid file' }),
			)
			.max(MAX_FILES_COUNT, `You can attach up to ${MAX_FILES_COUNT} files`)
			.refine(
				(files) => files.every((file) => file.size <= MAX_FILE_SIZE),
				'Each file must be under 50MB',
			)
			.refine(
				(files) =>
					files.every((file) =>
						ACCEPTED_MEDIA_TYPES.some((type) => file.type.startsWith(type)),
					),
				'Only images and videos are supported',
			)
			.optional(),
	})
	.refine(
		(data) =>
			data.text.length > 0 || (data.attachments && data.attachments.length > 0),
		{
			message: 'Message cannot be empty unless an attachment is provided',
			path: ['text'],
		},
	);

export type ChatMessageFormValues = z.infer<typeof chatMessageSchema>;
