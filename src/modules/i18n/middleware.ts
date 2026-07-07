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

export { intlMiddleware, stripLocale };
