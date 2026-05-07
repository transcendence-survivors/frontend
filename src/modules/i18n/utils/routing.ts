import { defineRouting } from 'next-intl/routing';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '../constants/locales';
import {
	APP_ROUTES,
	type RouteMap,
	type RouteKey,
	type CanonicalHref,
} from '../constants/routes';

const getRoute = <K extends RouteKey, L extends Locale = typeof DEFAULT_LOCALE>(
	key: K,
	locale: L = DEFAULT_LOCALE as L,
): RouteMap[K][L] => APP_ROUTES[key][locale];

const getPath = (key: RouteKey): CanonicalHref => APP_ROUTES[key].en;

const resolveRoute = (key: RouteKey, locale: Locale) => {
	return getRoute(key, locale);
};

const routing = defineRouting({
	locales: LOCALES,
	defaultLocale: DEFAULT_LOCALE,
	pathnames: Object.fromEntries(
		Object.values(APP_ROUTES).map((value) => [value.en, value]),
	) as Record<string, Record<Locale, string>>,
});

export { routing, getRoute, getPath, resolveRoute };
