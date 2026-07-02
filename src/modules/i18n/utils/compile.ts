import type { Locale } from '../constants/locales';
import type { RouteMap, RouteKey } from '../constants/routes';

type CompiledLocalePath = {
	path: string;
	isDynamic: boolean;
	regex?: RegExp;
	paramNames?: string[];
};

type CompiledRoute = {
	key: RouteKey;
	isDynamic: boolean;
	locales: Record<Locale, CompiledLocalePath>;
};

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const compilePath = (path: string): CompiledLocalePath => {
	const paramNames: string[] = [];

	const regexString = path
		.split('/')
		.map((segment) => {
			if (segment.startsWith(':')) {
				paramNames.push(segment.slice(1));
				return '([^/]+)';
			}
			return escapeRegex(segment);
		})
		.join('/');

	const isDynamic = paramNames.length > 0;

	return {
		path,
		isDynamic,
		regex: isDynamic ? new RegExp(`^${regexString}$`) : undefined,
		paramNames: isDynamic ? paramNames : undefined,
	};
};

const compileRoutes = (routes: RouteMap): CompiledRoute[] => {
	return Object.entries(routes).map(([key, localeMap]) => {
		const locales = Object.fromEntries(
			Object.entries(localeMap).map(([locale, path]) => [
				locale,
				compilePath(path),
			]),
		) as Record<Locale, CompiledLocalePath>;

		const isDynamic = locales.en.isDynamic;

		return { key: key as RouteKey, isDynamic, locales };
	});
};

export { compileRoutes, compilePath };
export type { CompiledRoute, CompiledLocalePath };
