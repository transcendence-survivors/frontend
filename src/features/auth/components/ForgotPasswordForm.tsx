'use client';

import Form from '@/modules/forms/components/Form';
import {
	type ForgotPasswordFormValues,
	forgotPasswordFields,
	forgotPasswordSchema,
	forgotPasswordValues,
} from '../schemas/forgot-password.schema';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { isApiError } from '@/libs/api/is';
import useForgotPassword from '../hooks/useForgotPassword';
import useTranslatedForm from '@/modules/forms/hooks/useTranslatedForm';
import { is } from 'zod/v4/locales';

const ForgotPasswordForm = () => {
	const { t, form, translatedFields } = useTranslatedForm<ForgotPasswordFormValues>({
		namespace: 'auth.forgot_password',
		fields: forgotPasswordFields,
		schema: forgotPasswordSchema,
		defaultValues: forgotPasswordValues,
	});

	const { mutateAsync, isSuccess } = useForgotPassword({
		successMessage: t('success'),
	});
	async function onSubmit(data: ForgotPasswordFormValues) {
		try {
			const res = await mutateAsync(data);
			if (isApiError(res)) {
				if (res.code == 500) {
					throw new Error(res.message);
				}
			}
		} catch {
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
				footer={
					isSuccess ? (
						<small className='text-success text-center text-sm'>
							{t('success')}
						</small>
					) : null
				}
			/>
		</>
	);
};

export default ForgotPasswordForm;
