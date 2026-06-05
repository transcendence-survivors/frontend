'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signUpSteps, signUpValues } from '../schemas/signup.schema';
import { MultiStepForm } from '@forms/components/MutliStepForm';
import { translateMultiStep } from '@forms/utils/translate/multiStep';
import { SignUpFormValues } from '../schemas/signup.schema';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSignUp from '../hooks/useSignUp';

const SignupForm = () => {
	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: signUpValues,
		mode: 'onChange',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	const t = useTranslations('forms.auth.signup');
	const translatedSteps = useMemo(
		() => translateMultiStep<SignUpFormValues>(signUpSteps, t),
		[t],
	);
	const { mutate } = useSignUp();

	async function onSubmit({
		displayName,
		email,
		firstName,
		lastName,
		password,
		username,
	}: SignUpFormValues) {
		mutate({ displayName, email, firstName, lastName, password, username });
	}

	return (
		<>
			<MultiStepForm
				form={form}
				steps={translatedSteps}
				onSubmit={onSubmit}
				buttons={{
					backText: 'Go Back',
					continueText: 'Continue',
					submitText: 'Submit',
					submittingText: 'Submitting',
				}}
				progressBar={{ on: true }}
				recap={{ on: true, recapTitle: 'Recap' }}
				className='w-lg'
			/>
		</>
	);
};

export default SignupForm;
