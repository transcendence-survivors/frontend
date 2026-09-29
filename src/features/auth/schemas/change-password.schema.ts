import { userPasswordSchema } from '@/features/user/schemas/user.schema';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import { z } from 'zod';
import { type FormFieldParams } from '@/modules/forms/types/FormFieldParams';

const changePasswordSchema = z
	.object({
		currentPassword: z.string({ message: FORM_ERRORS.string }).min(1),
		newPassword: userPasswordSchema,
		confirmPassword: z.string({ message: FORM_ERRORS.string }),
	})
	.refine(({ currentPassword, newPassword }) => currentPassword !== newPassword, {
		path: ['newPassword'],
		message: FORM_ERRORS.security_same_password,
	})
	.refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
		path: ['confirmPassword'],
		message: FORM_ERRORS.passwordsMustMatch,
	});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

const changePasswordFields = [
	{
		component: 'input',
		name: 'currentPassword',
		variant: 'password',
		placeholder: 'currentPasswordPlaceholder',
		label: { text: 'currentPassword' },
	},
	{
		component: 'input',
		name: 'newPassword',
		variant: 'password',
		placeholder: 'newPasswordPlaceholder',
		label: { text: 'newPassword' },
	},
	{
		component: 'input',
		name: 'confirmPassword',
		variant: 'password',
		placeholder: 'confirmPasswordPlaceholder',
		label: { text: 'confirmPassword' },
	},
] satisfies FormFieldParams<ChangePasswordFormValues>[];

const changePasswordValues: Partial<ChangePasswordFormValues> = {
	currentPassword: '',
	newPassword: '',
	confirmPassword: '',
};

export { changePasswordSchema, changePasswordFields, changePasswordValues };
export type { ChangePasswordFormValues };
