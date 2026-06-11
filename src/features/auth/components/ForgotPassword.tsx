'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import Form from '@/modules/forms/components/Form';
import {
	type ForgotPasswordFormValues,
	forgotPasswordFields,
	forgotPasswordSchema,
	forgotPasswordValues,
} from '../schemas/forgot-password.schema';
import { translateFields } from '@/modules/forms/utils/translate/fields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const ForgotPasswordForm = () => {
	const t = useTranslations('auth.forgot_password');
	const translatedFields = useMemo(() => {
		return translateFields<ForgotPasswordFormValues>(forgotPasswordFields, t);
	}, [t]);
	const form = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: forgotPasswordValues,
		mode: 'onChange',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	async function onSubmit(data: ForgotPasswordFormValues) {
		console.log(data);
	}

	return (
		<>
			<Form
				form={form}
				fields={translatedFields}
				onSubmit={onSubmit}
				button={{
					submitText: t('submit'),
					submittingText: t('submitting'),
					submittedText: t('submitted'),
				}}
			/>
		</>
	);
};

export default ForgotPasswordForm;
