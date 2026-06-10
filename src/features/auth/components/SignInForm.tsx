'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useSignInUsername } from '../hooks/useSinIn';
import Form from '@/modules/forms/components/Form';
import {
	signInFields,
	type SignInFormValues,
	signInSchema,
	signInValues,
} from '../schemas/signin.schema';
import { translateFields } from '@/modules/forms/utils/translate/fields';

const SignInForm = () => {
	const t = useTranslations('auth.signin');
	const translatedFields = useMemo(() => {
		return translateFields<SignInFormValues>(signInFields, t);
	}, [t]);
	const { mutate } = useSignInUsername({
		successMessage: t('success'),
		errorMessage: t('error'),
	});

	async function onSubmit(data: SignInFormValues) {
		mutate(data);
	}

	return (
		<>
			<Form
				schema={signInSchema}
				fields={translatedFields}
				onSubmit={onSubmit}
				defaultValues={signInValues}
				states={{}}
			/>
		</>
	);
};

export default SignInForm;
