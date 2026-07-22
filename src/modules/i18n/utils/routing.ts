import { defineRouting } from 'next-intl/routing';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '../constants/locales';
import { APP_ROUTES, type RouteKey, type CanonicalHref } from '../constants/routes';

export const getPathImpl = (
	key: RouteKey,
	params?: Record<string, string | number>,
): string => {
	const template = APP_ROUTES[key].en;
	if (!params) return template;
	return template.replace(/:([a-zA-Z0-9_]+)/g, (_match, paramName: string) => {
		const value = params[paramName];
		if (value === undefined) {
			throw new Error(`Missing value for param "${paramName}" in route "${key}"`);
		}
		return String(value);
	});
};

export const getBasePath = (key: RouteKey): CanonicalHref => APP_ROUTES[key].en;

export const routing = defineRouting({
	locales: LOCALES,
	defaultLocale: DEFAULT_LOCALE,
	pathnames: Object.fromEntries(
		Object.values(APP_ROUTES).map((value) => [value.en, value]),
	) as Record<string, Record<Locale, string>>,
});
