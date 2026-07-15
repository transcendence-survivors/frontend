import { Locale, LOCALES } from '../constants/locales';
import { DYNAMIC_ROUTES, RouteKey, STATIC_ROUTES } from '../constants/routes';

export const resolveRouteKeyPath = (path: string, locale?: Locale): RouteKey | null => {
	for (const route of STATIC_ROUTES) {
		const candidates = locale ? [locale] : (Object.keys(route.locales) as Locale[]);
		for (const loc of candidates) {
			if (route.locales[loc]?.path === path) {
				return route.key;
			}
		}
	}

	for (const route of DYNAMIC_ROUTES) {
		const candidates = locale ? [locale] : (Object.keys(route.locales) as Locale[]);
		for (const loc of candidates) {
			if (route.locales[loc]?.regex?.test(path)) {
				return route.key;
			}
		}
	}

	return null;
};

export const stripLocale = (pathname: string): string => {
	for (const locale of LOCALES) {
		if (pathname === `/${locale}`) return '/';
		if (pathname.startsWith(`/${locale}/`))
			return pathname.slice(`/${locale}`.length);
	}
	return pathname;
};
