import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { type GlobalError } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { FORM_ERRORS } from '../constants/error';
import { isI18nKey } from '@/modules/i18n/utils/isKey';
import { cn } from '@/libs/utils';

interface FormToastProps extends React.HTMLAttributes<HTMLElement> {
	error: GlobalError;
}

const FormGlobalError = ({ error: { message }, className, ...props }: FormToastProps) => {
	const t = useTranslations();

	const error = useMemo(() => {
		const value = message || '';
		return isI18nKey(t, value) ? t(value) : t(FORM_ERRORS.internal_server_error);
	}, [t, message]);

	useEffect(() => {
		toast.error(error);

		return () => {
			toast.dismiss();
		};
	}, [error, t]);

	return (
		<small
			className={cn('text-destructive text-center block mx-auto ', className)}
			{...props}>
			{error}
		</small>
	);
};

export default FormGlobalError;
