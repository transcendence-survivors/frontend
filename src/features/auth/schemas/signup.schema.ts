import { FORM_ERRORS } from '@/modules/forms/constants/error';
import {
	MultiStepFormStep,
	StepValidationFn,
} from '@/modules/forms/utils/mutliStep/types';
import { i18nError } from '@forms/utils/translate/errors';
import { z } from 'zod';
import { isApiError } from '@/libs/api';
import { checkEmail, checkUsername } from '../api/signUp';
import { isOlderThan13 } from '@/libs/date';

const emailValidator: StepValidationFn<SignUpFormValues> = async ({
	values: { email },
}) => {
	const res = await checkEmail(email);
	console.log(res);
	if (isApiError(res)) {
		if (res.code === 409) {
			return {
				ok: false,
				errors: [
					{
						field: 'email',
						message: FORM_ERRORS.email_already_in_use,
					},
				],
			};
		}
		return {
			ok: false,
			errors: [
				{
					field: 'root',
					message: FORM_ERRORS.internal_server_error,
				},
			],
		};
	}
	return { ok: true };
};

const userNameValidator: StepValidationFn<SignUpFormValues> = async ({
	values: { username },
}) => {
	const res = await checkUsername(username);
	if (isApiError(res)) {
		if (res.code === 409) {
			return {
				ok: false,
				errors: [
					{
						field: 'username',
						message: FORM_ERRORS.username_already_in_use,
					},
				],
			};
		}
	}
	return { ok: true };
};

export type SignUpFormValues = z.infer<typeof signUpSchema>;
const signUpSchema = z
	.object({
		email: z
			.email({ message: FORM_ERRORS.email })
			.lowercase({ message: FORM_ERRORS.lowercase }),
		username: z
			.string({ message: FORM_ERRORS.string })
			.min(1, { message: i18nError(FORM_ERRORS.minLength, { min: 1 }) })
			.max(25, { message: i18nError(FORM_ERRORS.maxLength, { max: 25 }) }),

		firstName: z
			.string({ message: FORM_ERRORS.string })
			.min(2, { message: i18nError(FORM_ERRORS.minLength, { min: 2 }) })
			.max(50, { message: i18nError(FORM_ERRORS.maxLength, { max: 50 }) }),
		lastName: z
			.string({ message: FORM_ERRORS.string })
			.min(2, { message: i18nError(FORM_ERRORS.minLength, { min: 2 }) })
			.max(50, { message: i18nError(FORM_ERRORS.maxLength, { max: 50 }) }),
		birthdate: z
			.date({ message: FORM_ERRORS.date })
			.refine((val) => isOlderThan13(val), {
				message: FORM_ERRORS.age_restriction,
			}),
		gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say'], {
			message: FORM_ERRORS.enum,
		}),

		displayName: z
			.string({ message: FORM_ERRORS.string })
			.min(1, { message: i18nError(FORM_ERRORS.minLength, { min: 1 }) })
			.max(25, { message: i18nError(FORM_ERRORS.maxLength, { max: 25 }) }),
		bio: z
			.string({ message: FORM_ERRORS.string })
			.max(255, { message: i18nError(FORM_ERRORS.maxLength, { max: 255 }) })
			.optional(),

		password: z
			.string({ message: FORM_ERRORS.string })
			.min(8, { message: i18nError(FORM_ERRORS.minLength, { min: 8 }) })
			.max(60, { message: i18nError(FORM_ERRORS.maxLength, { max: 60 }) })
			.regex(/[A-Z]/, { message: FORM_ERRORS.password_uppercase })
			.regex(/[a-z]/, { message: FORM_ERRORS.password_lowercase })
			.regex(/[0-9]/, { message: FORM_ERRORS.password_number })
			.regex(/[^A-Za-z0-9]/, { message: FORM_ERRORS.password_special }),
		confirmPassword: z.string({ message: FORM_ERRORS.string }),

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
		title: 'account.title',
		description: 'account.account_desc',
		fields: [
			{
				name: 'email',
				label: {
					text: 'account.email',
				},
				component: 'input',
				type: 'email',
				placeholder: 'account.emailPlaceholder',
			},
			{
				name: 'username',
				label: { text: 'account.username' },
				component: 'input',
				placeholder: 'account.usernamePlaceholder',
			},
		],
		validators: [emailValidator, userNameValidator],
	},
	{
		title: 'personal.title',
		description: 'personal.desc',
		fields: [
			{
				name: 'gender',
				label: { text: 'personal.gender' },
				component: 'select',
				placeholder: 'personal.genderPlaceholder',
				optionsGroups: [
					{
						label: 'personal.genderOptions.label',
						options: [
							{
								value: 'male',
								label: 'personal.genderOptions.male',
							},
							{
								value: 'female',
								label: 'personal.genderOptions.female',
							},
							{
								value: 'other',
								label: 'personal.genderOptions.other',
							},
						],
					},
				],
			},
			{
				name: 'firstName',
				label: { text: 'personal.firstName' },
				component: 'input',
				placeholder: 'personal.firstNamePlaceholder',
			},
			{
				name: 'lastName',
				label: { text: 'personal.lastName' },
				component: 'input',
				placeholder: 'personal.lastNamePlaceholder',
			},
			{
				name: 'birthdate',
				label: { text: 'personal.birthdate' },
				component: 'date',
			},
		],
	},
	{
		title: 'profile.title',
		description: 'profile.desc',
		fields: [
			{
				name: 'displayName',
				label: { text: 'profile.displayName' },
				component: 'input',
				placeholder: 'profile.displayNamePlaceholder',
			},

			{
				name: 'bio',
				label: { text: 'profile.bio' },
				component: 'textarea',
				placeholder: 'profile.bioPlaceholder',
				required: false,
				addon: {
					type: 'length',
					maxLength: 255,
					align: 'block-end',
				},
			},
		],
	},
	{
		title: 'security.title',
		description: 'security.desc',
		fields: [
			{
				name: 'password',
				label: { text: 'security.password' },
				component: 'input',
				placeholder: 'security.passwordPlaceholder',
				variant: 'password',
			},
			{
				name: 'confirmPassword',
				label: { text: 'security.confirmPassword' },
				component: 'input',
				variant: 'password',
				placeholder: 'security.confirmPasswordPlaceholder',
			},
		],
	},
	{
		title: 'terms.title',
		description: 'terms.desc',
		fields: [
			{
				name: 'acceptTerms',
				label: { text: 'terms.acceptTerms' },
				component: 'checkbox',
			},
		],
	},
] satisfies MultiStepFormStep<SignUpFormValues>[];

const signUpValues: Partial<SignUpFormValues> = {
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
