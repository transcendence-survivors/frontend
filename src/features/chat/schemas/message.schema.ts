import { bucketsConfig } from '@/libs/api/helpers/attachments';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { i18nError } from '@/modules/forms/utils/translate/errors';
import z from 'zod';

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
						bucketsConfig.chat.mimes.some((type) =>
							file.type.startsWith(type),
						),
					),
				{ message: FORM_ERRORS.imageVideoOnly },
			)
			.max(bucketsConfig.chat.maxFilesCount, {
				message: i18nError(FORM_ERRORS.maxFilesCount, {
					maxCount: bucketsConfig.chat.maxFilesCount,
				}),
			})
			.refine(
				(files) => files.every((file) => file.size <= bucketsConfig.chat.maxSize),
				{
					message: i18nError(FORM_ERRORS.fileSizeMB, {
						maxSize: bucketsConfig.chat.maxSizeMB,
					}),
				},
			)
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
