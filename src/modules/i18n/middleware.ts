import createMiddleware from 'next-intl/middleware';
import { routing } from './utils/routing';
import { LOCALES } from './constants/locales';
import { DYNAMIC_ROUTES, RouteKey, STATIC_ROUTES } from './constants/routes';

const intlMiddleware = createMiddleware(routing);

const stripLocale = (pathname: string): string => {
	for (const locale of LOCALES) {
		if (pathname === `/${locale}`) return '/';
		if (pathname.startsWith(`/${locale}/`))
			return pathname.slice(`/${locale}`.length);
	}
	return pathname;
};

const resolveRouteKeyPath = (path: string): RouteKey | null => {
	for (const route of STATIC_ROUTES) {
		console.log(`route.en: ${route.en}, path: ${path}`);
		if (route.en === path) {
			return route.key as RouteKey;
		}
	}
	for (const route of DYNAMIC_ROUTES) {
		if (route.regex?.test(path)) {
			return route.key as RouteKey;
		}
	}
	console.log(`No canonical path found for: ${path}`);
	return null;
};

export { intlMiddleware, stripLocale, resolveRouteKeyPath };
