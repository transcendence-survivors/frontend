import { useMemo } from 'react';
import { useForm, FieldValues, DefaultValues, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { ZodType } from 'zod';
import { NestedMessageKeys } from '@/modules/i18n/messages/types';
import { translateMultiStep } from '../utils/translate/multiStep';
import { MultiStepFormStep } from '../utils/mutliStep/types';

interface UseTranslatedMultiStepFormOptions<T extends FieldValues> {
	namespace: NestedMessageKeys;
	fields: MultiStepFormStep<T>[];
	schema: ZodType<T, T>;
	defaultValues: DefaultValues<T>;
}

const useTranslatedMultiStepForm = <T extends FieldValues>({
	namespace,
	fields,
	schema,
	defaultValues,
}: UseTranslatedMultiStepFormOptions<T>) => {
	const t = useTranslations(namespace);
	const translatedSteps = useMemo(() => translateMultiStep<T>(fields, t), [fields, t]);

	const form = useForm<T>({
		resolver: zodResolver(schema) as unknown as Resolver<T>,
		defaultValues,
		mode: 'onChange',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	return { t, form, translatedSteps };
};

export default useTranslatedMultiStepForm;
