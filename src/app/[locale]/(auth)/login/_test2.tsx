'use client';

import { z } from 'zod';
import Form from '@/components/customs/Form/Form';
import type { FormField } from '@/components/customs/Form/FormField';
import { useLogin } from '@/hooks/useLogin';
import { toast } from 'sonner';
import { useMemo } from 'react';
import { translateFields } from '@/i18n/utils';
import { useTranslations } from 'next-intl';

const schema = z.object({
	name: z.string().min(1).max(50),
	email: z.email(),
	role: z.enum(['admin', 'user'], {
		message: 'Choose a valid role',
	}),
	bio: z.string().max(100, 'Bio must be at most 100 characters.'),
	acceptTerms: z.boolean().refine((val) => val === true, {
		message: 'You must accept the terms and conditions',
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
] satisfies FormField<FormValues>[];

const defaultValues = {
	name: '',
	email: '',
	role: '' as FormValues['role'],
	bio: '',
	acceptTerms: false,
} satisfies FormValues;

export default function MyForm() {
	const { mutate, isPending, isError, isSuccess } = useLogin();
	const t = useTranslations('forms.test');
	const translatedFields = useMemo(() => translateFields(fields, t), [t]);

	const onSubmit = (data: FormValues) => {
		console.log('Form submitted:', data);

		mutate(data, {
			onSuccess: () => {
				toast.success('Form submitted successfully!');
			},
		});
	};

	return (
		<Form
			schema={schema}
			fields={translatedFields}
			defaultValues={defaultValues}
			onSubmit={onSubmit}
			resetBtn={{
				show: false,
			}}
			submitBtn={{
				text: t('submit'),
				onDisabledText: t('disabled'),
				onSubmitedText: t('submitted'),
			}}
			states={{
				isPending,
				isError,
				wasSubmitted: isSuccess,
			}}
		/>
	);
}
