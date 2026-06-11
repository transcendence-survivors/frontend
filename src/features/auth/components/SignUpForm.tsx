'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signUpSteps, signUpValues } from '../schemas/signup.schema';
import { MultiStepForm } from '@forms/components/MutliStepForm';
import { translateMultiStep } from '@forms/utils/translate/multiStep';
import { SignUpFormValues } from '../schemas/signup.schema';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import useSignUp from '../hooks/useSignUp';

const SignupForm = () => {
	const t = useTranslations('auth.signup');
	const translatedSteps = useMemo(() => {
		return translateMultiStep<SignUpFormValues>(signUpSteps, t);
	}, [t]);
	const { mutate } = useSignUp({
		successMessage: t('success'),
		errorMessage: t('error'),
	});
	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: signUpValues,
		mode: 'onChange',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	const password = useWatch({ control: form.control, name: 'password' });
	useEffect(() => {
		if (form.getFieldState('confirmPassword').isDirty) {
			form.trigger('confirmPassword');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [password]);

	async function onSubmit(data: SignUpFormValues) {
		console.log(data);
		mutate(data);
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
				className='w-lg'
			/>
		</>
	);
};

export default SignupForm;
