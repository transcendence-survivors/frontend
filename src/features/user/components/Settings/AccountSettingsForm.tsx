'use client';

import { FORM_ERRORS } from '@/modules/forms/constants/error';
import useTranslatedForm from '@/modules/forms/hooks/useTranslatedForm';
import Form from '@/modules/forms/components/Form';
import {
	accountSettingsFields,
	AccountSettingsFormValues,
	accountSettingsSchema,
} from '../../schemas/accountSettings.schema';
import { UserSettings } from '../../type';
import { usePatchUserSettings } from '../../hooks/usePatchUserSettings';

type AccountSettingsFormProps = {
	user: Pick<
		UserSettings,
		'firstName' | 'lastName' | 'birthDate' | 'gender' | 'localePreference'
	>;
};

export const AccountSettingsForm = ({
	user: { firstName, lastName, birthDate, gender, localePreference },
}: AccountSettingsFormProps) => {
	const { mutateAsync: patchSettings } = usePatchUserSettings();

	const { t, form, translatedFields } = useTranslatedForm<AccountSettingsFormValues>({
		namespace: 'auth.signup',
		fields: accountSettingsFields,
		schema: accountSettingsSchema,
		defaultValues: {
			firstName,
			lastName,
			birthDate: birthDate ? new Date(birthDate) : undefined,
			gender,
			locale: localePreference,
		},
	});

	async function onSubmit(data: AccountSettingsFormValues) {
		try {
			await patchSettings({
				firstName: data.firstName,
				lastName: data.lastName,
				birthDate: data.birthDate,
				gender: data.gender,
				localePreference: data.locale,
			});
		} catch {
			form.setError('root', { message: FORM_ERRORS.internal_server_error });
		}
	}

	return (
		<Form
			form={form}
			fields={translatedFields}
			onSubmit={onSubmit}
			multipleSubmit={true}
			button={{
				submitText: t('buttons.save'),
				submittingText: t('buttons.saving'),
				submittedText: t('buttons.saved'),
			}}
		/>
	);
};
