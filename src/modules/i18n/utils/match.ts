import { Locale } from '../constants/locales';
import { COMPILED_ROUTES, RouteKey } from '../constants/routes';

export const matchRoute = (
	key: RouteKey,
	pathname: string,
	locale: Locale = 'en',
): Record<string, string> | null => {
	const route = COMPILED_ROUTES.find((r) => r.key === key);
	if (!route) return null;

	const compiled = route.locales[locale];
	if (!compiled.isDynamic) {
		return compiled.path === pathname ? {} : null;
	}

	const match = pathname.match(compiled.regex);
	if (!match) return null;
	return compiled.paramNames.reduce<Record<string, string>>((params, name, index) => {
		params[name] = match[index + 1];
		return params;
	}, {});
};
