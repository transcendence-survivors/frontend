import createMiddleware from 'next-intl/middleware';
import { routing } from './utils/routing';
import { LOCALES } from './constants/locales';
import { CanonicalHref } from './constants/routes';

const intlMiddleware = createMiddleware(routing);

const stripLocale = (pathname: string): string => {
	for (const locale of LOCALES) {
		if (pathname === `/${locale}`) return '/';
		if (pathname.startsWith(`/${locale}/`))
			return pathname.slice(`/${locale}`.length);
	}
	return pathname;
};

const buildDynamicRouteRegex = (path: string): RegExp => {
	return new RegExp(
		`^${path
			.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
			.replace(/:[^/]+/g, '[^/]+')}(/.*)?$`,
	);
};

const resolveCanonicalPath = (deLocalizedPath: string): CanonicalHref | null => {
	for (const [enPath, localeMap] of Object.entries(routing.pathnames)) {
		for (const localizedPath of Object.values(localeMap as Record<string, string>)) {
			if (buildDynamicRouteRegex(localizedPath).test(deLocalizedPath))
				return enPath as CanonicalHref;
		}
	}
	return null;
};

export { intlMiddleware, stripLocale, resolveCanonicalPath };
