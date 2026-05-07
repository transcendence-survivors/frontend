export { default as getRequestConfig } from './request';

export { Link, redirect, usePathname, useRouter, getPathname } from './utils/navigation';
export { translateFields, i18nError } from './utils/utils';

export { default as LocaleSwitcher } from './components/LocaleSwitcher';
export { default as I18nLink } from './components/I18nLink';

export { intlMiddleware, stripLocale, resolveCanonicalPath } from './middleware';

export {
	APP_ROUTES,
	REDIRECTED_URLS,
	type CanonicalHref,
	type RouteKey,
	type RouteMap,
} from './constants/routes';
export { DEFAULT_LOCALE, LOCALES, LOCALE_LABELS, type Locale } from './constants/locales';

export type { AppMessages, MessageKeys } from './messages/types';

export { default as METADATA } from './constants/metadata';
