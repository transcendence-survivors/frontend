'use client';

import { useMemo } from 'react';
import { z } from 'zod';
import { useLogin } from '../hooks/useLogin';
import { useTranslations } from 'next-intl';
import { FORM_ERRORS } from '@forms/constants/error';
import { FormFieldG } from '@/modules/forms/components/FormField';
import Form from '@forms/components/Form';
import { i18nError, translateFields } from '@i18n/utils/utils';
import useTranslateFormFields from '../hooks/useTranslateFormFields';

const schema = z.object({
	name: z
		.string({ message: FORM_ERRORS.type })
		.min(5, { message: i18nError(FORM_ERRORS.minLength, { min: 5 }) })
		.max(50, {
			message: i18nError(FORM_ERRORS.maxLength, { max: 50 }),
		}),

	email: z.email({ message: FORM_ERRORS.email }),

	role: z.enum(['admin', 'user'], { message: FORM_ERRORS.select }),

	bio: z.string({ message: FORM_ERRORS.type }).max(100, {
		message: i18nError(FORM_ERRORS.maxLength, { max: 100 }),
	}),

	acceptTerms: z.boolean({ message: FORM_ERRORS.type }).refine((val) => val === true, {
		message: FORM_ERRORS.mustAcceptTerms,
	}),
});

type FormValues = z.output<typeof schema>;

const fields = [
	{
		name: 'name',
		label: 'name',
		component: 'input',
		placeholder: 'namePlaceholder',
	},
	{
		name: 'email',
		label: 'email',
		component: 'input',
		placeholder: 'emailPlaceholder',
		type: 'email',
	},
	{
		name: 'role',
		label: 'role',
		component: 'select',
		placeholder: 'rolePlaceholder',
		optionsGroups: [
			{
				label: 'userRoles',
				options: [
					{ value: 'admin', label: 'admin' },
					{ value: 'user', label: 'user' },
				],
			},
		],
	},
	{
		name: 'bio',
		label: 'bio',
		component: 'textarea',
		placeholder: 'bioPlaceholder',
		addon: {
			type: 'length',
			align: 'block-end',
			maxLength: 100,
		},
	},
	{
		component: 'checkbox',
		name: 'acceptTerms',
		label: 'acceptTerms',
		placeholder: '',
	},
] satisfies FormFieldG<FormValues>[];

const defaultValues = {
	name: '',
	email: '',
	role: '' as FormValues['role'],
	bio: '',
	acceptTerms: false,
} satisfies FormValues;

const TestForm2 = () => {
	const { isPending, isError, isSuccess } = useLogin();
	const { t, translatedFields } = useTranslateFormFields<FormValues>(
		'forms.test',
		fields,
	);

	const onSubmit = (data: FormValues) => {
		console.log('Form submitted:', data);

		// mutate(data, {
		// 	onSuccess: () => {
		// 		toast.success('Form submitted successfully!');
		// 	},
		// });
	};

	return (
		<Form
			fields={translatedFields}
			schema={schema}
			defaultValues={defaultValues}
			onSubmit={onSubmit}
			resetBtn={{
				show: true,
				text: t('reset'),
			}}
			submitBtn={{
				text: t('submit'),
				onDisabledText: t('disabled'),
				onSubmitedText: t('submitted'),
				onEmptyFieldsText: t('emptyFieldsBtn'),
			}}
			states={{
				isPending,
				isError,
				wasSubmitted: isSuccess,
			}}
		/>
	);
};

export default TestForm2;
