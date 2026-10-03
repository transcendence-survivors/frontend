import { z } from 'zod';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { i18nError } from '@/modules/forms/utils/translate/errors';
import {
	userBioSchema,
	userDisplayNameSchema,
} from '@/features/user/schemas/user.schema';
import { bucketsConfig } from '@/libs/api/helpers/attachments';

const imageFileSchema = z
	.custom<File>((val) => val instanceof File, {
		message: FORM_ERRORS.imageOnly,
	})
	.refine(
		(file) => bucketsConfig.avatar.mimes.some((type) => file.type.startsWith(type)),
		{
			message: FORM_ERRORS.imageOnly,
		},
	)
	.refine((file) => file.size <= bucketsConfig.avatar.maxSize, {
		message: i18nError(FORM_ERRORS.fileSizeMB, {
			maxSize: bucketsConfig.avatar.maxSizeMB,
		}),
	});

export const profileSettingsSchema = z
	.object({
		displayName: userDisplayNameSchema.optional(),
		bio: userBioSchema.optional(),
		avatarFile: imageFileSchema.optional(),
		coverFile: imageFileSchema.optional(),
		removeAvatar: z.boolean().optional(),
		removeCover: z.boolean().optional(),
	})
	.refine(
		(data) => {
			const hasDisplayName = data.displayName !== undefined;
			const hasBio = data.bio !== undefined;
			const hasAvatarUpload = data.avatarFile instanceof File;
			const hasCoverUpload = data.coverFile instanceof File;
			const hasAvatarRemoval = data.removeAvatar === true;
			const hasCoverRemoval = data.removeCover === true;

			return (
				hasDisplayName ||
				hasBio ||
				hasAvatarUpload ||
				hasCoverUpload ||
				hasAvatarRemoval ||
				hasCoverRemoval
			);
		},
		{
			message: FORM_ERRORS.at_least_one,
			path: ['form'],
		},
	);

export type ProfileSettingsFormValues = z.infer<typeof profileSettingsSchema>;
