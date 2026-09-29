'use client';

import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import {
	changePasswordFields,
	changePasswordSchema,
	changePasswordValues,
	type ChangePasswordFormValues,
} from '../schemas/change-password.schema';
import useTranslatedForm from '@/modules/forms/hooks/useTranslatedForm';
import Form from '@/modules/forms/components/Form';
import { useChangePassword } from '../hooks/useChangePassword';
import { ApiException } from '@/libs/api';

export const ChangePasswordForm = () => {
	const { t, form, translatedFields } = useTranslatedForm<ChangePasswordFormValues>({
		namespace: 'auth.change_password',
		fields: changePasswordFields,
		schema: changePasswordSchema,
		defaultValues: changePasswordValues,
	});

	const { mutateAsync } = useChangePassword({ successMessage: t('success') });

	const newPassword = useWatch({ control: form.control, name: 'newPassword' });
	const currentPassword = useWatch({ control: form.control, name: 'currentPassword' });

	useEffect(() => {
		if (form.getFieldState('confirmPassword').isDirty) {
			form.trigger('confirmPassword');
		}
		if (form.getFieldState('newPassword').isDirty) {
			form.trigger('newPassword');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newPassword, currentPassword]);

	async function onSubmit({ currentPassword, newPassword }: ChangePasswordFormValues) {
		try {
			await mutateAsync({ currentPassword, newPassword });
			form.reset(changePasswordValues);
		} catch (err: unknown) {
			if (err instanceof ApiException && err.statusCode === 400) {
				return form.setError('currentPassword', {
					message: FORM_ERRORS.security_incorrect_current_password,
				});
			}
			return form.setError('root', { message: FORM_ERRORS.internal_server_error });
		}
	}

	return (
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
	);
};

export default ChangePasswordForm;
