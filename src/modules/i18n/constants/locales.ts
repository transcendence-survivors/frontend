const DEFAULT_LOCALE = 'fr' as const;
const LOCALES = [DEFAULT_LOCALE, 'en', 'de'] as const;

type Locale = (typeof LOCALES)[number];

const LOCALE_LABELS = {
	en: 'English',
	de: 'Deutsch',
	fr: 'Français',
} as const satisfies Record<Locale, string>;

const LOCALE_ICONS = {
	en: '🇬🇧',
	de: '🇩🇪',
	fr: '🇫🇷',
} as const satisfies Record<Locale, string>;

export { DEFAULT_LOCALE, LOCALES, LOCALE_LABELS, LOCALE_ICONS };
export type { Locale };
