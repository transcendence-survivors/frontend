'use client';

import {
	Locale,
	LOCALE_DATE_FNS,
	LOCALE_ICONS,
	LOCALE_LABELS,
	LOCALES,
} from '../constants/locales';
import { usePathname, useRouter } from '../utils/navigation';
import { useLocale } from 'next-intl';

const useLocaleParams = () => {
	const locale = useLocale() as Locale;
	const pathname = usePathname();
	const router = useRouter();

	const nextLocale = LOCALES[(LOCALES.indexOf(locale) + 1) % LOCALES.length];

	const setLocale = (newLocale: Locale) => {
		router.replace(pathname, { locale: newLocale });
	};

	return {
		localesIcon: LOCALE_ICONS,
		locales: LOCALES,
		localeLabels: LOCALE_LABELS,
		currentLocale: locale,
		nextLocale,
		setLocale,
		dateLocale: LOCALE_DATE_FNS[locale],
	};
};

export default useLocaleParams;
