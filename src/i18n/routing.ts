import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'de', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export type RouteMap = Record<Locale, string>;

export const routeMap = {
	home: {
		en: '/',
		de: '/',
		fr: '/',
	},
	game: {
		en: '/game',
		de: '/spiel',
		fr: '/jeu',
	},
	leaderboard: {
		en: '/leaderboard',
		de: '/rangliste',
		fr: '/classement',
	},
	profile: {
		en: '/profile',
		de: '/profil',
		fr: '/profil',
	},
	settings: {
		en: '/settings',
		de: '/einstellungen',
		fr: '/parametres',
	},
} satisfies Record<string, RouteMap>;

export type RouteKey = keyof typeof routeMap;
export type CanonicalHref = (typeof routeMap)[RouteKey]['en'];

export const getRoute = <
	K extends RouteKey,
	L extends Locale = typeof defaultLocale,
>(
	key: K,
	locale: L = defaultLocale as L,
): (typeof routeMap)[K][L] => {
	return routeMap[key][locale];
};

export const getPath = (key: RouteKey): CanonicalHref => {
	return routeMap[key].en;
};

const pathnames: Record<string, RouteMap> = Object.fromEntries(
	Object.values(routeMap).map((value) => [value.en, value]),
);

export const routing = defineRouting({
	locales,
	defaultLocale,
	pathnames: {
		...pathnames,
	},
});
