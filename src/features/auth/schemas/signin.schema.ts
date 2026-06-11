import { FORM_ADDONS } from '@/modules/forms/constants/addons';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { FormFieldParams } from '@/modules/forms/types/FormFieldParams';
import { z } from 'zod';

export type SignInFormValues = z.infer<typeof signInSchema>;
const signInSchema = z.object({
	username: z
		.string({ message: FORM_ERRORS.string })
		.nonempty({ message: FORM_ERRORS.required }),
	password: z
		.string({ message: FORM_ERRORS.string })
		.nonempty({ message: FORM_ERRORS.required }),
});

const signInFields = [
	{
		component: 'input',
		name: 'username',
		type: 'text',
		label: { text: 'username' },
	},
	{
		component: 'input',
		variant: 'password',
		name: 'password',
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
	username: '',
	password: '',
};

export { signInValues, signInSchema, signInFields };
