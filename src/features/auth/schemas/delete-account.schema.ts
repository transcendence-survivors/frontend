import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { type FormFieldParams } from '@/modules/forms/types/FormFieldParams';
import { i18nError } from '@/modules/forms/utils/translate/errors';
import { z } from 'zod';

const deleteAccountSchema = z.object({
	password: z
		.string({ message: FORM_ERRORS.string })
		.min(1, { message: FORM_ERRORS.required })
		.max(255, { message: i18nError(FORM_ERRORS.maxLength, { max: 255 }) }),
});

type DeleteAccountFormValues = z.infer<typeof deleteAccountSchema>;

const deleteAccountFields = [
	{
		component: 'input',
		name: 'password',
		variant: 'password',
		placeholder: 'password_placeholder',
		label: { text: 'password_label', srOnly: true },
	},
] satisfies FormFieldParams<DeleteAccountFormValues>[];

const deleteAccountValues: Partial<DeleteAccountFormValues> = {
	password: '',
};

export { deleteAccountFields, deleteAccountSchema, deleteAccountValues };
export type { DeleteAccountFormValues };
