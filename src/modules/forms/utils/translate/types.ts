import { useTranslations } from 'next-intl';

export type RootTFunction = ReturnType<typeof useTranslations>;

export type LooseTFunction = (
	key: string,
	values?: Record<string, string | number | Date>,
) => string;
