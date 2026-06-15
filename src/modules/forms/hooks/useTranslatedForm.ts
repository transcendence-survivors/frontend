import { useMemo } from 'react';
import { useForm, FieldValues, DefaultValues, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { ZodType } from 'zod';
import { FormFieldParams } from '../types/FormFieldParams';
import { translateFields } from '../utils/translate/fields';
import { NestedMessageKeys } from '@/modules/i18n/messages/types';

interface UseTranslatedFormOptions<T extends FieldValues> {
	namespace: NestedMessageKeys;
	fields: FormFieldParams<T>[];
	schema: ZodType<T, T>;
	defaultValues: DefaultValues<T>;
}

const useTranslatedForm = <T extends FieldValues>({
	namespace,
	fields,
	schema,
	defaultValues,
}: UseTranslatedFormOptions<T>) => {
	const t = useTranslations(namespace);
	const translatedFields = useMemo(() => translateFields<T>(fields, t), [fields, t]);

	const form = useForm<T>({
		resolver: zodResolver(schema) as unknown as Resolver<T>,
		defaultValues,
		mode: 'onChange',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	return { t, form, translatedFields };
};

export default useTranslatedForm;
