import { FORM_ADDONS } from '@/modules/forms/constants/addons';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { FormFieldParams } from '@/modules/forms/types/FormFieldParams';
import { i18nError } from '@/modules/forms/utils/translate/errors';
import { z } from 'zod';

export type SignInFormValues = z.infer<typeof signInSchema>;
const signInSchema = z.object({
	usernameOrEmail: z
		.string({ message: FORM_ERRORS.string })
		.nonempty({ message: FORM_ERRORS.required })
		.max(255, { message: i18nError(FORM_ERRORS.maxLength, { max: 255 }) }),
	password: z
		.string({ message: FORM_ERRORS.string })
		.nonempty({ message: FORM_ERRORS.required })
		.max(255, { message: i18nError(FORM_ERRORS.maxLength, { max: 255 }) }),
});

const signInFields = [
	{
		component: 'input',
		name: 'usernameOrEmail',
		placeholder: 'username_or_emailPlaceholder',
		type: 'text',
		label: { text: 'username_or_email' },
	},
	{
		component: 'input',
		variant: 'password',
		name: 'password',
		placeholder: 'passwordPlaceholder',
		label: {
			text: 'password',
			addon: {
				type: 'link',
				variant: 'internal',
				as: 'text',
				href: 'forgotPassword',
				text: FORM_ADDONS.forgot_password,
			},
		},
	},
] satisfies FormFieldParams<SignInFormValues>[];

const signInValues: Partial<SignInFormValues> = {
	usernameOrEmail: '',
	password: '',
};

export { signInValues, signInSchema, signInFields };
