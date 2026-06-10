import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { FormFieldParams } from '@/modules/forms/types/FormFieldParams';
import { z } from 'zod';

export type SignInFormValues = z.infer<typeof signInSchema>;
const signInSchema = z.object({
	username: z.string({ message: FORM_ERRORS.string }),
	password: z.string({ message: FORM_ERRORS.string }),
});

const signInFields = [
	{
		component: 'input',
		name: 'username',
		type: 'text',
		label: 'username',
	},
	{
		component: 'input',
		variant: 'password',
		name: 'password',
		label: 'password',
	},
] satisfies FormFieldParams<SignInFormValues>[];

const signInValues: Partial<SignInFormValues> = {
	username: '',
	password: '',
};

export { signInValues, signInSchema, signInFields };
