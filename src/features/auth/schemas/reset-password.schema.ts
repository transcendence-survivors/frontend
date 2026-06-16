import { userPasswordSchema } from '@/features/user/schemas/user.schema';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { z } from 'zod';
import { type FormFieldParams } from '@/modules/forms/types/FormFieldParams';

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
const resetPasswordSchema = z
	.object({
		password: userPasswordSchema,
		confirmPassword: z.string({ message: FORM_ERRORS.string }),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		path: ['confirmPassword'],
		message: FORM_ERRORS.passwordsMustMatch,
	});

const resetPasswordFields = [
	{
		component: 'input',
		name: 'password',
		variant: 'password',
		placeholder: 'passwordPlaceholder',
		label: { text: 'password' },
	},
	{
		component: 'input',
		name: 'confirmPassword',
		variant: 'password',
		placeholder: 'confirmPasswordPlaceholder',
		label: { text: 'confirmPassword' },
	},
] satisfies FormFieldParams<ResetPasswordFormValues>[];

const resetPasswordValues: Partial<ResetPasswordFormValues> = {
	password: '',
	confirmPassword: '',
};

export { resetPasswordSchema, resetPasswordFields, resetPasswordValues };
export type { ResetPasswordFormValues };
