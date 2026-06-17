'use client';

import { useWatch } from 'react-hook-form';
import { signUpSchema, signUpSteps, signUpValues } from '../schemas/signup.schema';
import { MultiStepForm } from '@forms/components/MutliStepForm';
import { SignUpFormValues } from '../schemas/signup.schema';
import { useEffect } from 'react';
import useSignUp from '../hooks/useSignUp';
import useTranslatedMultiStepForm from '@/modules/forms/hooks/useTranslatedMultiStepForm';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { isApiError } from '@/libs/api';

const SignupForm = () => {
	const { t, form, translatedSteps } = useTranslatedMultiStepForm({
		namespace: 'auth.signup',
		fields: signUpSteps,
		schema: signUpSchema,
		defaultValues: signUpValues,
	});

	const password = useWatch({ control: form.control, name: 'password' });
	useEffect(() => {
		if (form.getFieldState('confirmPassword').isDirty) {
			form.trigger('confirmPassword');
		} // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [password]);

	const { mutateAsync } = useSignUp({ successMessage: t('success') });
	async function onSubmit(data: SignUpFormValues) {
		try {
			const res = await mutateAsync({
				username: data.username,
				email: data.email,
				password: data.password,
				bio: data.bio,
				dateOfBirth: data.birthdate,
				displayName: data.displayName,
				firstName: data.firstName,
				lastName: data.lastName,
				gender: data.gender,
				localePreference: data?.locale,
			});
			if (isApiError(res)) {
				if (res.code === 409) {
					form.setError('form', { message: FORM_ERRORS.user_already_exists });
					return;
				}
				throw new Error(res.message);
			}
		} catch {
			form.setError('root', { message: FORM_ERRORS.internal_server_error });
		}
	}

	return (
		<>
			<MultiStepForm
				form={form}
				steps={translatedSteps}
				onSubmit={onSubmit}
				buttons={{
					backText: t('buttons.back'),
					continueText: t('buttons.continue'),
					validatingText: t('buttons.validating'),
					submitText: t('buttons.submit'),
					submittingText: t('buttons.submitting'),
					submittedText: t('buttons.submitted'),
				}}
				progressBar={{ on: true, stepIndicator: true }}
				recap={{ on: true, recapTitle: t('recap_title') }}
			/>
		</>
	);
};

export default SignupForm;
