import { FormFieldG } from '@/modules/forms/components/Base/FormField';
import { translateFields } from '@forms/utils/translate/fields';
import { NestedMessageKeys } from '@/modules/i18n/messages/types';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { FieldValues } from 'react-hook-form';

const useTranslateFormFields = <T extends FieldValues>(
	translateKey: NestedMessageKeys,
	fields: FormFieldG<T>[],
) => {
	const t = useTranslations(translateKey);
	const translatedFields = useMemo(() => translateFields(fields, t), [t, fields]);

	return {
		t,
		translatedFields,
	};
};

export default useTranslateFormFields;
