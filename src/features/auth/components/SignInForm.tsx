'use client';

import useSignIn from '../hooks/useSignIn';
import Form from '@/modules/forms/components/Form';
import {
	signInFields,
	type SignInFormValues,
	signInSchema,
	signInValues,
} from '../schemas/signin.schema';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import useTranslatedForm from '@/modules/forms/hooks/useTranslatedForm';
import { ApiException } from '@/libs/api/';

const SignInForm = () => {
	const { t, form, translatedFields } = useTranslatedForm<SignInFormValues>({
		namespace: 'auth.signin',
		fields: signInFields,
		schema: signInSchema,
		defaultValues: signInValues,
	});

	const { mutateAsync } = useSignIn({ successMessage: t('success') });
	async function onSubmit(data: SignInFormValues) {
		try {
			await mutateAsync(data);
		} catch (err: unknown) {
			if (err instanceof ApiException && err.statusCode === 401) {
				return form.setError('form', {
					message: FORM_ERRORS.invalid_credentials,
				});
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

export default SignInForm;
