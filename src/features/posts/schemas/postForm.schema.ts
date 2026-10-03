import { z } from 'zod';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { i18nError } from '@/modules/forms/utils/translate/errors';
import { bucketsConfig } from '@/libs/api/helpers/attachments';

export const postImageFileSchema = z
	.custom<File>((val) => val instanceof File, {
		message: FORM_ERRORS.imageOnly,
	})
	.refine(
		(file) => bucketsConfig.post.mimes.some((type) => file.type.startsWith(type)),
		{ message: FORM_ERRORS.imageOnly },
	)
	.refine((file) => file.size <= bucketsConfig.post.maxSize, {
		message: i18nError(FORM_ERRORS.fileSizeMB, {
			maxSize: bucketsConfig.post.maxSizeMB,
		}),
	});

export const postFormSchema = z
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

export type PostFormValues = z.infer<typeof postFormSchema>;
