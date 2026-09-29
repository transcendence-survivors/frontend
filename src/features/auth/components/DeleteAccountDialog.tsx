'use client';

import { Button } from '@/components/ui/button';
import { FORM_ERRORS } from '@/modules/forms/constants/error';
import {
	deleteAccountFields,
	deleteAccountSchema,
	deleteAccountValues,
	type DeleteAccountFormValues,
} from '../schemas/delete-account.schema';
import { useDeleteAccount } from '../hooks/useDeleteAccount';
import { ApiException } from '@/libs/api';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import useTranslatedForm from '@/modules/forms/hooks/useTranslatedForm';
import FormField from '@/modules/forms/components/Base/FormField';
import { Spinner } from '@/components/ui/spinner';
import FormGlobalError from '@/modules/forms/components/FormGlobalError';

export const DeleteAccountDialog = () => {
	const { t, form, translatedFields } = useTranslatedForm<DeleteAccountFormValues>({
		namespace: 'auth.delete_account',
		fields: deleteAccountFields,
		schema: deleteAccountSchema,
		defaultValues: deleteAccountValues,
	});

	const { mutateAsync, isPending } = useDeleteAccount({
		successMessage: t('success'),
	});

	const handleSubmit = async ({ password }: DeleteAccountFormValues) => {
		try {
			await mutateAsync({ password });
		} catch (err: unknown) {
			if (err instanceof ApiException && err.statusCode === 400) {
				return form.setError('password', {
					message: FORM_ERRORS.security_incorrect_current_password,
				});
			}
			form.setError('root', { message: FORM_ERRORS.internal_server_error });
		}
	};

	return (
		<ActionConfirmDialog
			title={t('title')}
			description={t('description')}
			confirmText={isPending ? <Spinner /> : t('confirm_text')}
			isDestructive
			isPending={isPending}
			trigger={
				<Button variant='destructive' className='w-fit'>
					{t('trigger')}
				</Button>
			}
			onConfirm={form.handleSubmit(handleSubmit)}
			childrenBoxClassName='bg-transparent border-0'>
			<div className='bg-card overflow-hidden'>
				{translatedFields.map((field) => (
					<FormField
						key={field.name}
						field={field}
						control={form.control}
						disabled={isPending}
					/>
				))}

				{form.formState.errors.root && (
					<div className='pt-2 text-sm'>
						<FormGlobalError error={form.formState.errors.root} />
					</div>
				)}
			</div>
		</ActionConfirmDialog>
	);
};

export default DeleteAccountDialog;
