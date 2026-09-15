import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { i18nError } from '@/modules/forms/utils/translate/errors';
import z from 'zod';

export const ACCEPTED_MEDIA_TYPES = ['image/', 'video/'];
export const MAX_FILE_SIZE = 50 * 1024 * 1024;
export const MAX_FILES_COUNT = 5;

export const chatMessageSchema = z
	.object({
		text: z
			.string()
			.trim()
			.max(4000, { message: i18nError(FORM_ERRORS.maxLength, { max: 4000 }) }),

		attachments: z
			.array(
				z.custom<File>((val) => val instanceof File, {
					message: FORM_ERRORS.imageVideoOnly,
				}),
			)
			.refine(
				(files) =>
					files.every((file) =>
						ACCEPTED_MEDIA_TYPES.some((type) => file.type.startsWith(type)),
					),
				{ message: FORM_ERRORS.imageVideoOnly },
			)
			.max(MAX_FILES_COUNT, {
				message: i18nError(FORM_ERRORS.maxFilesCount, {
					maxCount: MAX_FILES_COUNT,
				}),
			})
			.refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
				message: i18nError(FORM_ERRORS.fileSizeMB, { maxSize: 10 }),
			})
			.optional(),
	})
	.refine(
		(data) =>
			data.text.length > 0 || (data.attachments && data.attachments.length > 0),
		{
			message: FORM_ERRORS.messageEmptyIfAttachments,
			path: ['text'],
		},
	);

export type ChatMessageFormValues = z.infer<typeof chatMessageSchema>;
