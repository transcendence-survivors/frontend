import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { MultiStepFormStep } from '@/modules/forms/utils/mutliStep/types';
import { i18nError } from '@forms/utils/translate/errors';
import { z } from 'zod';

export type SignUpFormValues = z.infer<typeof signUpSchema>;

const signUpSchema = z
	.object({
		email: z.email({ message: FORM_ERRORS.email }),
		username: z
			.string({ message: FORM_ERRORS.type })
			.min(3, { message: i18nError(FORM_ERRORS.minLength, { min: 3 }) }),

		firstName: z
			.string({ message: FORM_ERRORS.type })
			.min(2, { message: i18nError(FORM_ERRORS.minLength, { min: 2 }) }),
		lastName: z
			.string({ message: FORM_ERRORS.type })
			.min(2, { message: i18nError(FORM_ERRORS.minLength, { min: 2 }) }),
		displayName: z
			.string({ message: FORM_ERRORS.type })
			.min(2, { message: i18nError(FORM_ERRORS.minLength, { min: 2 }) }),
		bio: z
			.string({ message: FORM_ERRORS.type })
			.max(160, { message: i18nError(FORM_ERRORS.maxLength, { max: 160 }) })
			.optional(),

		password: z
			.string()
			.min(6, { message: i18nError(FORM_ERRORS.minLength, { min: 6 }) })
			.max(60, { message: i18nError(FORM_ERRORS.maxLength, { max: 60 }) }),
		confirmPassword: z
			.string()
			.min(6, { message: i18nError(FORM_ERRORS.minLength, { min: 6 }) })
			.max(60, { message: i18nError(FORM_ERRORS.maxLength, { max: 60 }) }),

		acceptTerms: z
			.boolean({ message: FORM_ERRORS.mustAcceptTerms })
			.refine((val) => val === true, { message: FORM_ERRORS.mustAcceptTerms }),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		path: ['confirmPassword'],
		message: FORM_ERRORS.passwordsMustMatch,
	});

const signUpSteps = [
	{
		title: 'account',
		fields: [
			{
				name: 'email',
				label: 'email',
				component: 'input',
				type: 'email',
				placeholder: 'emailPlaceholder',
			},
			{
				name: 'username',
				label: 'username',
				component: 'input',
				placeholder: 'usernamePlaceholder',
			},
		],
		validators: [
			async ({ values }) => {
				// if (values.email !== 'benoit.cabocel.335@gmail.com') {
				// 	return {
				// 		ok: false,
				// 		message: FORM_ERRORS.emailTaken,
				// 		field: 'email',
				// 	};
				// }
				return { ok: true };
			},
		],
	},
	{
		title: 'profile',
		fields: [
			{
				name: 'firstName',
				label: 'firstName',
				component: 'input',
				placeholder: 'firstNamePlaceholder',
			},
			{
				name: 'lastName',
				label: 'lastName',
				component: 'input',
				placeholder: 'lastNamePlaceholder',
			},
			{
				name: 'displayName',
				label: 'displayName',
				component: 'input',
				placeholder: 'displayNamePlaceholder',
			},
			{
				name: 'bio',
				label: 'bio',
				component: 'textarea',
				placeholder: 'bioPlaceholder',
				addon: {
					type: 'length',
					maxLength: 160,
					align: 'block-end',
				},
			},
		],
	},
	{
		title: 'security',
		fields: [
			{
				name: 'password',
				label: 'password',
				component: 'input',
				type: 'password',
				placeholder: 'passwordPlaceholder',
			},
			{
				name: 'confirmPassword',
				label: 'confirmPassword',
				component: 'input',
				type: 'password',
				placeholder: 'confirmPasswordPlaceholder',
			},
		],
	},
	{
		title: 'terms',
		fields: [
			{
				name: 'acceptTerms',
				label: 'acceptTerms',
				component: 'checkbox',
			},
		],
	},
] satisfies MultiStepFormStep<SignUpFormValues>[];

const signUpValues: SignUpFormValues = {
	email: '',
	username: '',
	firstName: '',
	lastName: '',
	displayName: '',
	bio: '',
	password: '',
	confirmPassword: '',
	acceptTerms: false,
};

export { signUpValues, signUpSchema, signUpSteps };
