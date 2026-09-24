import { z } from 'zod';
import {
	userBirthdateSchema,
	userFirstNameSchema,
	userGenderSchema,
	userLastNameSchema,
	userLocaleSchema,
} from '@/features/user/schemas/user.schema';
import { FormFieldParams } from '@/modules/forms/types/FormFieldParams';

export const accountSettingsSchema = z.object({
	firstName: userFirstNameSchema.optional(),
	lastName: userLastNameSchema.optional(),
	birthDate: userBirthdateSchema.optional(),
	gender: userGenderSchema.optional(),
	locale: userLocaleSchema.optional(),
});

export type AccountSettingsFormValues = z.infer<typeof accountSettingsSchema>;

export const accountSettingsFields = [
	{
		name: 'firstName',
		label: { text: 'personal.firstName' },
		component: 'input',
		placeholder: 'personal.firstNamePlaceholder',
		required: false,
	},
	{
		name: 'lastName',
		label: { text: 'personal.lastName' },
		component: 'input',
		placeholder: 'personal.lastNamePlaceholder',
		required: false,
	},
	{
		name: 'birthDate',
		label: { text: 'personal.birthdate' },
		component: 'date',
		required: false,
	},
	{
		name: 'locale',
		label: { text: 'personal.locale' },
		component: 'select',
		required: false,
		placeholder: 'personal.localePlaceholder',
		optionsGroups: [
			{
				label: 'personal.localeOptions.label',
				options: [
					{ value: 'EN', label: 'personal.localeOptions.en' },
					{ value: 'FR', label: 'personal.localeOptions.fr' },
					{ value: 'DE', label: 'personal.localeOptions.de' },
				],
			},
		],
	},
	{
		name: 'gender',
		label: { text: 'personal.gender' },
		component: 'select',
		required: false,
		placeholder: 'personal.genderPlaceholder',
		optionsGroups: [
			{
				label: 'personal.genderOptions.label',
				options: [
					{ value: 'MALE', label: 'personal.genderOptions.male' },
					{ value: 'FEMALE', label: 'personal.genderOptions.female' },
					{ value: 'OTHER', label: 'personal.genderOptions.other' },
					{
						value: 'PREFER_NOT_TO_SAY',
						label: 'personal.genderOptions.prefer_not_to_say',
					},
				],
			},
		],
	},
] satisfies FormFieldParams<AccountSettingsFormValues>[];
