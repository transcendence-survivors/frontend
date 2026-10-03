'use client';

import Form from '@/modules/forms/components/Form';
import {
	type ForgotPasswordFormValues,
	forgotPasswordFields,
	forgotPasswordSchema,
	forgotPasswordValues,
} from '../schemas/forgot-password.schema';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import useForgotPassword from '../hooks/useForgotPassword';
import useTranslatedForm from '@/modules/forms/hooks/useTranslatedForm';

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
			await mutateAsync(data);
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
						<small className='text-success text-xs text-center'>
							{t('success')}
						</small>
					) : null
				}
			/>
		</>
	);
};

export default ForgotPasswordForm;
