import { z } from 'zod';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { i18nError } from '@/modules/forms/utils/translate/errors';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_MEDIA_TYPES = ['image/'];

export const postImageFileSchema = z
	.custom<File>((val) => val instanceof File, {
		message: FORM_ERRORS.imageOnly,
	})
	.refine((file) => ACCEPTED_MEDIA_TYPES.some((type) => file.type.startsWith(type)), {
		message: FORM_ERRORS.imageOnly,
	})
	.refine((file) => file.size <= MAX_FILE_SIZE, {
		message: i18nError(FORM_ERRORS.fileSizeMB, { maxSize: 50 }),
	});

export const createPostSchema = z
	.object({
		content: z.string().max(280).optional(),
		file: postImageFileSchema.optional(),
	})
	.refine(
		(data) => {
			const hasContent = Boolean(data.content && data.content.trim().length > 0);
			const hasFile = data.file instanceof File;
			return hasContent || hasFile;
		},
		{
			message: FORM_ERRORS.at_least_one,
			path: ['content'],
		},
	);

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
