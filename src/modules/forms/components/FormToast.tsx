import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { type GlobalError } from 'react-hook-form';
import { useEffect } from 'react';
import { FORM_ERRORS } from '../constants/error';
import { isI18nKey } from '@/modules/i18n/utils/isKey';

interface FormToastProps {
	error: GlobalError;
}

const FormToast = ({ error: { message } }: FormToastProps) => {
	const t = useTranslations();

	useEffect(() => {
		const value = message || '';
		if (!isI18nKey(t, value)) {
			toast.error(t(FORM_ERRORS.internal_server_error));
		} else toast.error(t(value));

		return () => {
			toast.dismiss();
		};
	}, [message, t]);

	return null;
};

export default FormToast;
