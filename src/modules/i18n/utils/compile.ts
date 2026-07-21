import type { Locale } from '../constants/locales';
import type { RouteMap, RouteKey } from '../constants/routes';

type CompiledLocalePath =
	| {
			path: string;
			isDynamic: false;
			regex?: undefined;
			paramNames?: undefined;
	  }
	| {
			path: string;
			isDynamic: true;
			regex: RegExp;
			paramNames: string[];
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

	if (paramNames.length === 0) {
		return {
			path,
			isDynamic: false,
		};
	}

	return {
		path,
		isDynamic: true,
		regex: new RegExp(`^${regexString}$`),
		paramNames,
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

		return {
			key: key as RouteKey,
			isDynamic: locales.en.isDynamic,
			locales,
		};
	});
};

export { compileRoutes, compilePath };
export type { CompiledRoute, CompiledLocalePath };
