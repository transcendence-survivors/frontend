import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { FormFieldParams } from '@/modules/forms/types/FormFieldParams';
import { i18nError } from '@/modules/forms/utils/translate/errors';
import z from 'zod';

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
const forgotPasswordSchema = z.object({
	email: z
		.email({ message: FORM_ERRORS.email })
		.nonempty({ message: FORM_ERRORS.required })
		.max(255, { message: i18nError(FORM_ERRORS.maxLength, { max: 255 }) }),
});

const forgotPasswordFields = [
	{
		component: 'input',
		name: 'email',
		variant: 'email',
		placeholder: 'emailPlaceholder',
		label: { text: 'email' },
	},
] satisfies FormFieldParams<ForgotPasswordFormValues>[];

const forgotPasswordValues: Partial<ForgotPasswordFormValues> = {
	email: '',
};

export { forgotPasswordFields, forgotPasswordSchema, forgotPasswordValues };
export type { ForgotPasswordFormValues };
