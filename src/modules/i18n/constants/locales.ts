import { type Locale as DateLocale } from 'date-fns';
import { de, enUS, es, fr, it } from 'date-fns/locale';

const DEFAULT_LOCALE = 'fr' as const;
const LOCALES = [DEFAULT_LOCALE, 'en', 'de', 'es', 'che', 'it'] as const;

type Locale = (typeof LOCALES)[number];

const LOCALE_LABELS = {
	en: 'English',
	de: 'Deutsch',
	fr: 'Français',
	es: 'Español',
	che: 'Swiss German',
	it: 'Italiano',
} as const satisfies Record<Locale, string>;

const LOCALE_DATE_FNS = {
	en: enUS,
	de: de,
	fr: fr,
	es: es,
	che: de,
	it: it,
} as const satisfies Record<Locale, DateLocale>;

const LOCALE_ICONS = {
	en: '🇬🇧',
	de: '🇩🇪',
	fr: '🇫🇷',
	es: '🇪🇸',
	che: '🇨🇭',
	it: '🇮🇹',
} as const satisfies Record<Locale, string>;

export { DEFAULT_LOCALE, LOCALES, LOCALE_LABELS, LOCALE_ICONS, LOCALE_DATE_FNS };
export type { Locale };
