'use client';

import { useEffect } from 'react';
import Form from '@/modules/forms/components/Form';

import { useWatch } from 'react-hook-form';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import useResetPassword from '../hooks/useResetPassword';
import {
	resetPasswordFields,
	resetPasswordSchema,
	resetPasswordValues,
	type ResetPasswordFormValues,
} from '../schemas/reset-password.schema';
import useTranslatedForm from '@/modules/forms/hooks/useTranslatedForm';
import { ApiException } from '@/libs/api/';

const ResetPasswordForm = () => {
	const { t, form, translatedFields } = useTranslatedForm<ResetPasswordFormValues>({
		namespace: 'auth.reset_password',
		fields: resetPasswordFields,
		schema: resetPasswordSchema,
		defaultValues: resetPasswordValues,
	});
	const { mutateAsync } = useResetPassword({ successMessage: t('success') });

	const password = useWatch({ control: form.control, name: 'password' });
	useEffect(() => {
		if (form.getFieldState('confirmPassword').isDirty) {
			form.trigger('confirmPassword');
		} // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [password]);

	async function onSubmit({ password: newPassword }: ResetPasswordFormValues) {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');

		if (!token) return form.setError('root', { message: FORM_ERRORS.invalid_token });

		try {
			await mutateAsync({ newPassword, token });
		} catch (err: unknown) {
			if (err instanceof ApiException && err.statusCode !== 500) {
				return form.setError('root', { message: FORM_ERRORS.invalid_token });
			}
			form.setError('root', { message: FORM_ERRORS.internal_server_error });
		}
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

export default ResetPasswordForm;
