import { isOlderThan13 } from '@/libs/date';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { i18nError } from '@/modules/forms/utils/translate/errors';
import { z } from 'zod';

const userEmailSchema = z
	.email({ message: FORM_ERRORS.email })
	.lowercase({ message: FORM_ERRORS.lowercase });

const userNameSchema = z
	.string({ message: FORM_ERRORS.string })
	.min(1, { message: i18nError(FORM_ERRORS.minLength, { min: 1 }) })
	.max(25, { message: i18nError(FORM_ERRORS.maxLength, { max: 25 }) });

const userFirstNameSchema = z
	.string({ message: FORM_ERRORS.string })
	.min(2, { message: i18nError(FORM_ERRORS.minLength, { min: 2 }) })
	.max(50, { message: i18nError(FORM_ERRORS.maxLength, { max: 50 }) });

const userLastNameSchema = z
	.string({ message: FORM_ERRORS.string })
	.min(2, { message: i18nError(FORM_ERRORS.minLength, { min: 2 }) })
	.max(50, { message: i18nError(FORM_ERRORS.maxLength, { max: 50 }) });

const userBirthdateSchema = z
	.date({ message: FORM_ERRORS.date })
	.refine((val) => isOlderThan13(val), { message: FORM_ERRORS.age_restriction });

const userGenderSchema = z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'], {
	message: FORM_ERRORS.enum,
});

const userLocaleSchema = z.enum(['EN', 'FR', 'DE'], { message: FORM_ERRORS.enum });

const userDisplayNameSchema = z
	.string({ message: FORM_ERRORS.string })
	.min(1, { message: i18nError(FORM_ERRORS.minLength, { min: 1 }) })
	.max(25, { message: i18nError(FORM_ERRORS.maxLength, { max: 25 }) });

const userBioSchema = z
	.string({ message: FORM_ERRORS.string })
	.max(255, { message: i18nError(FORM_ERRORS.maxLength, { max: 255 }) });

const userPasswordSchema = z
	.string({ message: FORM_ERRORS.string })
	.min(8, { message: i18nError(FORM_ERRORS.minLength, { min: 8 }) })
	.max(60, { message: i18nError(FORM_ERRORS.maxLength, { max: 60 }) })
	.regex(/[A-Z]/, { message: FORM_ERRORS.password_uppercase })
	.regex(/[a-z]/, { message: FORM_ERRORS.password_lowercase })
	.regex(/[0-9]/, { message: FORM_ERRORS.password_number })
	.regex(/[^A-Za-z0-9]/, { message: FORM_ERRORS.password_special });

const userSchema = z.object({
	email: userEmailSchema,
	username: userNameSchema,
	firstName: userFirstNameSchema,
	lastName: userLastNameSchema,
	birthdate: userBirthdateSchema,
	gender: userGenderSchema,
	displayName: userDisplayNameSchema,
	bio: userBioSchema.optional(),
	password: userPasswordSchema,
});

type UserSchema = z.infer<typeof userSchema>;
type UserGender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
type UserLocale = 'EN' | 'FR' | 'DE';
type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';
type User = Omit<UserSchema, 'password'> & {
	id: string;
	role: UserRole;
	avatarUrl?: string;
	bannerUrl?: string;
};

export {
	userEmailSchema,
	userNameSchema,
	userGenderSchema,
	userFirstNameSchema,
	userLastNameSchema,
	userBirthdateSchema,
	userLocaleSchema,
	userDisplayNameSchema,
	userBioSchema,
	userPasswordSchema,
	userSchema,
};

export type { User, UserRole, UserGender, UserLocale };
