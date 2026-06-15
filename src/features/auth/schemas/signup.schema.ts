import { FORM_ERRORS } from '@/modules/forms/constants/error';
import {
	MultiStepFormStep,
	StepValidationFn,
} from '@/modules/forms/utils/mutliStep/types';
import { z } from 'zod';
import { isApiError } from '@/libs/api';
import { checkEmail, checkUsername } from '../api/signUp.api';
import {
	userBioSchema,
	userBirthdateSchema,
	userDisplayNameSchema,
	userEmailSchema,
	userFirstNameSchema,
	userGenderSchema,
	userLastNameSchema,
	userNameSchema,
	userPasswordSchema,
} from '@/features/user/schemas/user.schema';

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
		email: userEmailSchema,
		username: userNameSchema,
		firstName: userFirstNameSchema,
		lastName: userLastNameSchema,
		birthdate: userBirthdateSchema,
		gender: userGenderSchema,

		displayName: userDisplayNameSchema,
		bio: userBioSchema,

		password: userPasswordSchema,
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
								value: 'MALE',
								label: 'personal.genderOptions.male',
							},
							{
								value: 'FEMALE',
								label: 'personal.genderOptions.female',
							},
							{
								value: 'OTHER',
								label: 'personal.genderOptions.other',
							},
							{
								value: 'PREFER_NOT_TO_SAY',
								label: 'personal.genderOptions.prefer_not_to_say',
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
