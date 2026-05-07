import { Locale } from './locales';

type LocaleRouteFormat = Record<Locale, `/${string}`>;
type RouteMapFromat = Record<string, LocaleRouteFormat>;

type StrictRouteMap<T extends RouteMapFromat> = T & {
	[K in keyof T]: {
		[L in keyof T[K]]: L extends Locale ? T[K][L] : never;
	};
};

const defineRouteMap = <T extends RouteMapFromat>(map: StrictRouteMap<T>): T => map as T;

const APP_ROUTES = defineRouteMap({
	home: {
		en: '/',
		de: '/',
		fr: '/',
	},
	register: {
		en: '/register',
		de: '/registrieren',
		fr: '/inscription',
	},
	login: {
		en: '/login',
		de: '/anmelden',
		fr: '/connexion',
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
	posts: {
		en: '/posts',
		de: '/beitraege',
		fr: '/articles',
	},
	postId: {
		en: '/posts/:id',
		de: '/beitraege/:id',
		fr: '/articles/:id',
	},
	postIdMediaId: {
		en: '/posts/:id/media/:mediaId',
		de: '/beitraege/:id/medien/:mediaId',
		fr: '/articles/:id/media/:mediaId',
	},
} as const);

type RouteMap = typeof APP_ROUTES;
type RouteKey = keyof RouteMap;
type CanonicalHref = RouteMap[RouteKey]['en'];

const REDIRECTED_URLS = {
	403: APP_ROUTES.login.en,
	loggin: APP_ROUTES.login.en,
	success: APP_ROUTES.home.en,
} satisfies Record<string, CanonicalHref>;

export { APP_ROUTES, REDIRECTED_URLS };
export type { RouteMap, RouteKey, CanonicalHref };
