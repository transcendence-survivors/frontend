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
		if (res.code === 500) {
			return {
				ok: false,
				errors: [
					{
						field: 'form',
						message: FORM_ERRORS.internal_server_error,
					},
				],
			};
		}
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
		birthdate: z
			.date({ message: FORM_ERRORS.type })
			.refine((val) => isOlderThan13(val), {
				message: FORM_ERRORS.age_restriction,
			}),
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
		title: 'account.title',
		description: 'account.account_desc',
		fields: [
			{
				name: 'birthdate',
				label: 'account.phone',
				component: 'date',
			},
			{
				name: 'email',
				label: 'account.email',
				component: 'input',
				type: 'email',
				placeholder: 'account.emailPlaceholder',
			},
			{
				name: 'username',
				label: 'account.username',
				component: 'input',
				placeholder: 'account.usernamePlaceholder',
			},
		],
		validators: [emailValidator, userNameValidator],
	},
	{
		title: 'profile.title',
		description: 'profile.desc',
		fields: [
			{
				name: 'firstName',
				label: 'profile.firstName',
				component: 'input',
				placeholder: 'profile.firstNamePlaceholder',
			},
			{
				name: 'lastName',
				label: 'profile.lastName',
				component: 'input',
				placeholder: 'profile.lastNamePlaceholder',
			},
			{
				name: 'displayName',
				label: 'profile.displayName',
				component: 'input',
				placeholder: 'profile.displayNamePlaceholder',
			},
			{
				name: 'bio',
				label: 'profile.bio',
				component: 'textarea',
				placeholder: 'profile.bioPlaceholder',
				required: false,
				addon: {
					type: 'length',
					maxLength: 160,
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
				label: 'security.password',
				component: 'input',
				placeholder: 'security.passwordPlaceholder',
				variant: 'password',
			},
			{
				name: 'confirmPassword',
				label: 'security.confirmPassword',
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
				label: 'terms.acceptTerms',
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
	birthdate: new Date(),
};

export { signUpValues, signUpSchema, signUpSteps };
