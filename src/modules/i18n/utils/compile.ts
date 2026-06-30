import { RouteMap } from '../constants/routes';

type CompiledRoute = {
	key: string;
	en: string;
	localeMap: Record<string, string>;
	isDynamic: boolean;
	regex?: RegExp;
	paramNames?: string[];
};

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const compilePath = (path: string) => {
	const paramNames: string[] = [];

	const regexString = escapeRegex(path).replace(/\\:([^/]+)/g, (_, key) => {
		paramNames.push(key);
		return '([^/]+)';
	});

	return {
		regex: new RegExp(`^${regexString}$`),
		paramNames,
		isDynamic: paramNames.length > 0,
	};
};

const compileRoutes = (routes: RouteMap): CompiledRoute[] => {
	return Object.entries(routes).map(([key, localeMap]) => {
		const en = localeMap.en;
		const { regex, paramNames, isDynamic } = compilePath(en);

		return {
			key,
			en,
			localeMap,
			isDynamic,
			regex: isDynamic ? regex : undefined,
			paramNames: isDynamic ? paramNames : undefined,
		};
	});
};

export { compileRoutes, compilePath };
export type { CompiledRoute };
