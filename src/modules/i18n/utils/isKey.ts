import { useTranslations } from 'next-intl';
import { MessageKeys } from '../messages/types';

type useTranslationsReturn = ReturnType<typeof useTranslations<never>>;

export const isI18nKey = (
	t: useTranslationsReturn,
	value: string,
): value is MessageKeys => {
	return t.has(value as MessageKeys);
};
