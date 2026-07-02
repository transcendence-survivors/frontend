import { Locale } from '../constants/locales';
import { DYNAMIC_ROUTES, RouteKey, STATIC_ROUTES } from '../constants/routes';

const resolveRouteKeyPath = (path: string, locale?: Locale): RouteKey | null => {
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

export { resolveRouteKeyPath };
