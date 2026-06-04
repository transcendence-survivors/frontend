'use client';

import Form from '@/modules/forms/components/Form';
import { FormFieldG } from '@/modules/forms/components/FormField';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { i18nError } from '@/modules/i18n/utils/utils';
import * as z from 'zod';
import useTranslateFormFields from '../hooks/useTranslateFormFields';
import useSignUp from '../hooks/useSignUp';

const schema = z
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
		password: z
			.string()
			.min(6, { message: i18nError(FORM_ERRORS.minLength, { min: 6 }) })
			.max(60, { message: i18nError(FORM_ERRORS.maxLength, { max: 60 }) }),
		confirmPassword: z
			.string()
			.min(6, { message: i18nError(FORM_ERRORS.minLength, { min: 6 }) })
			.max(60, { message: i18nError(FORM_ERRORS.maxLength, { max: 60 }) }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: FORM_ERRORS.passwordsMustMatch,
		path: ['confirmPassword'],
	});

type SignUpFormValues = z.infer<typeof schema>;

const fields = [
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
		type: 'text',
		placeholder: 'usernamePlaceholder',
	},
	{
		name: 'firstName',
		label: 'firstName',
		component: 'input',
		type: 'text',
		placeholder: 'firstNamePlaceholder',
	},
	{
		name: 'lastName',
		label: 'lastName',
		component: 'input',
		type: 'text',
		placeholder: 'lastNamePlaceholder',
	},
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
] satisfies FormFieldG<SignUpFormValues>[];

const defaultValues: SignUpFormValues = {
	email: '',
	username: '',
	firstName: '',
	lastName: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const { isPending, isError, isSuccess, mutate } = useSignUp();
	const { t, translatedFields } = useTranslateFormFields<SignUpFormValues>(
		'forms.auth.signup',
		fields,
	);

	const onSubmit = ({ confirmPassword: _, ...rest }: SignUpFormValues) => {
		mutate({ ...rest, displayName: rest.username });
	};

	return (
		<Form
			schema={schema}
			fields={translatedFields}
			defaultValues={defaultValues}
			onSubmit={onSubmit}
			states={{
				isPending,
				isError,
				wasSubmitted: isSuccess,
			}}
			submitBtn={{
				text: t('submit'),
				onSubmitedText: t('submitted'),
				onDisabledText: t('submit'),
				onEmptyFieldsText: t('submit'),
			}}
		/>
	);
};

export default SignUpForm;
