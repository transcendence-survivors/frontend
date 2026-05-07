import createMiddleware from 'next-intl/middleware';
import { routing } from './utils/routing';
import { LOCALES } from './constants/locales';

const intlMiddleware = createMiddleware(routing);

const stripLocale = (pathname: string): string => {
	for (const locale of LOCALES) {
		if (pathname === `/${locale}`) return '/';
		if (pathname.startsWith(`/${locale}/`))
			return pathname.slice(`/${locale}`.length);
	}
	return pathname;
};

const buildDynamicRouteRegex = (path: string): RegExp =>
	new RegExp(
		`^${path
			.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
			.replace(/:[^/]+/g, '[^/]+')}(/.*)?$`,
	);

/**
 * Resolves a de-localized path to its canonical English path.
 *
 * @param deLocalizedPath The path to resolve (e.g., "/es/inicio" or "/fr/accueil").
 *
 * @returns The canonical English path (e.g., "/home") or null if no match is found.
 */
const resolveCanonicalPath = (deLocalizedPath: string): string | null => {
	for (const [enPath, localeMap] of Object.entries(routing.pathnames)) {
		for (const localizedPath of Object.values(localeMap as Record<string, string>)) {
			if (buildDynamicRouteRegex(localizedPath).test(deLocalizedPath))
				return enPath;
		}
	}
	return null;
};

export { intlMiddleware, stripLocale, resolveCanonicalPath };
