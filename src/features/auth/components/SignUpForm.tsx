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
	const { mutate } = useSignUp();
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

	async function onSubmit(data: SignUpFormValues) {
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
