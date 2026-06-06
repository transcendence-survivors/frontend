import { FORM_ERRORS } from '@/modules/forms/constants/error';
import {
	MultiStepFormStep,
	StepValidationFieldError,
	StepValidationFn,
} from '@/modules/forms/utils/mutliStep/types';
import { i18nError } from '@forms/utils/translate/errors';
import { z } from 'zod';
import { checkEmailUsername } from '../api/signUp';
import { isApiError } from '@/libs/api';

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

const accountValidator: StepValidationFn<SignUpFormValues> = async ({ values }) => {
	const res = await checkEmailUsername(values.email, values.username);
	if (isApiError(res)) {
		const errors: StepValidationFieldError<SignUpFormValues>[] = [];
		if (res.messageKey === 'email_already_in_use') {
			errors.push({
				field: 'email',
				message: FORM_ERRORS.email_already_in_use,
			});
		}
		if (res.messageKey === 'username_already_in_use') {
			errors.push({
				field: 'username',
				message: FORM_ERRORS.username_already_in_use,
			});
		}
		return {
			ok: false,
			errors,
		};
	}
	return { ok: true };
};

const signUpSteps = [
	{
		title: 'account.title',
		description: 'account.account_desc',
		fields: [
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
		validators: [accountValidator],
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
				type: 'password',
				placeholder: 'security.passwordPlaceholder',
			},
			{
				name: 'confirmPassword',
				label: 'security.confirmPassword',
				component: 'input',
				type: 'password',
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
};

export { signUpValues, signUpSchema, signUpSteps };
