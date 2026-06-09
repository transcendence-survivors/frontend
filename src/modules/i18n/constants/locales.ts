import { type Locale as DateLocale } from 'date-fns';
import { de, enUS, fr } from 'date-fns/locale';

const DEFAULT_LOCALE = 'fr' as const;
const LOCALES = [DEFAULT_LOCALE, 'en', 'de'] as const;

type Locale = (typeof LOCALES)[number];

const LOCALE_LABELS = {
	en: 'English',
	de: 'Deutsch',
	fr: 'Français',
} as const satisfies Record<Locale, string>;

const LOCALE_DATE_FNS: Record<Locale, DateLocale> = {
	en: enUS,
	de: de,
	fr: fr,
};

const LOCALE_ICONS = {
	en: '🇬🇧',
	de: '🇩🇪',
	fr: '🇫🇷',
} as const satisfies Record<Locale, string>;

export { DEFAULT_LOCALE, LOCALES, LOCALE_LABELS, LOCALE_ICONS, LOCALE_DATE_FNS };
export type { Locale };
