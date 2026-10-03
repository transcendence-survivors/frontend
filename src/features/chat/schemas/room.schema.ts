import { bucketsConfig } from '@/libs/api/helpers/attachments';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { i18nError } from '@/modules/forms/utils/translate/errors';
import { z } from 'zod';

export const patchRoomSchema = z
	.object({
		name: z
			.string()
			.trim()
			.max(100, { message: i18nError(FORM_ERRORS.maxLength, { max: 100 }) })
			.optional(),
		removeAvatar: z.boolean().optional(),
		avatarFile: z
			.custom<File>((val) => val instanceof File, {
				message: FORM_ERRORS.imageOnly,
			})
			.refine(
				(file) =>
					bucketsConfig.avatar.mimes.some((type) => file.type.startsWith(type)),
				{ message: FORM_ERRORS.imageOnly },
			)
			.refine((file) => file.size <= bucketsConfig.avatar.maxSize, {
				message: i18nError(FORM_ERRORS.fileSizeMB, {
					maxSize: bucketsConfig.avatar.maxSizeMB,
				}),
			})
			.optional(),
	})
	.refine(
		(data) => {
			const hasNameChange = data.name !== undefined;
			const hasAvatarUpload = data.avatarFile instanceof File;
			const hasAvatarRemoval = data.removeAvatar === true;

			return hasNameChange || hasAvatarUpload || hasAvatarRemoval;
		},
		{
			message: FORM_ERRORS.at_least_one,
			path: ['form'],
		},
	);

export type PatchRoomSchema = z.infer<typeof patchRoomSchema>;
