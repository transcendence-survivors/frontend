'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSignIn from '../hooks/useSignIn';
import Form from '@/modules/forms/components/Form';
import {
	signInFields,
	type SignInFormValues,
	signInSchema,
	signInValues,
} from '../schemas/signin.schema';
import { translateFields } from '@/modules/forms/utils/translate/fields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { isApiError } from '@/libs/api';

const SignInForm = () => {
	const t = useTranslations('auth.signin');
	const translatedFields = useMemo(() => {
		return translateFields<SignInFormValues>(signInFields, t);
	}, [t]);
	const form = useForm<SignInFormValues>({
		resolver: zodResolver(signInSchema),
		defaultValues: signInValues,
		mode: 'onChange',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	const { mutateAsync } = useSignIn({
		successMessage: t('success'),
	});

	async function onSubmit(data: SignInFormValues) {
		try {
			const res = await mutateAsync(data);
			if (isApiError(res)) {
				if (res.code === 401) {
					form.setError('form', { message: FORM_ERRORS.invalid_credentials });
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
