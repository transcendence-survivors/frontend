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

	landing: {
		en: '/home',
		de: '/empfang',
		fr: '/accueil',
		es: '/acogida',
		che: '/cquoica',
		it: '/benvenuto'
	},
	home: {
		en: '/',
		de: '/',
		fr: '/',
		es: '/',
		che: '/',
		it: '/',
	},
	register: {
		en: '/register',
		de: '/registrieren',
		fr: '/inscription',
		es: '/registro',
		che: '/registrieren',
		it: '/registrazione',
	},
	login: {
		en: '/login',
		de: '/anmelden',
		fr: '/connexion',
		es: '/iniciar-sesion',
		che: '/anmelden',
		it: '/accesso',
	},
	forgotPassword: {
		en: '/forgot-password',
		de: '/passwort-vergessen',
		fr: '/mot-de-passe-oublie',
		es: '/olvidar-contrasena',
		che: '/passwort-vergessen',
		it: '/password-dimenticata',
	},
	game: {
		en: '/game',
		de: '/spiel',
		fr: '/jeu',
		es: '/juego',
		che: '/spiel',
		it: '/gioco',
	},
	leaderboard: {
		en: '/leaderboard',
		de: '/rangliste',
		fr: '/classement',
		es: '/clasificacion',
		che: '/rangliste',
		it: '/classifica',
	},
	profile: {
		en: '/profile',
		de: '/profil',
		fr: '/profil',
		es: '/perfil',
		che: '/profil',
		it: '/profilo',
	},
	settings: {
		en: '/settings',
		de: '/einstellungen',
		fr: '/parametres',
		es: '/configuracion',
		che: '/einstellungen',
		it: '/impostazioni',
	},
	posts: {
		en: '/posts',
		de: '/beitraege',
		fr: '/articles',
		es: '/articulos',
		che: '/beitraege',
		it: '/articoli',
	},
	postId: {
		en: '/posts/:id',
		de: '/beitraege/:id',
		fr: '/articles/:id',
		es: '/articulos/:id',
		che: '/beitraege/:id',
		it: '/articoli/:id',
	},
	postIdMediaId: {
		en: '/posts/:id/media/:mediaId',
		de: '/beitraege/:id/medien/:mediaId',
		fr: '/articles/:id/media/:mediaId',
		es: '/articulos/:id/media/:mediaId',
		che: '/beitraege/:id/medien/:mediaId',
		it: '/articoli/:id/media/:mediaId',
	},
} as const);

type RouteMap = typeof APP_ROUTES;
type RouteKey = keyof RouteMap;
type CanonicalHref = RouteMap[RouteKey]['en'];

type RedirectedUrls = Record<string, CanonicalHref> | { callbackKey: string };

const REDIRECTED_URLS = {
	callbackKey: 'callbackUrl',
	403: APP_ROUTES.login.en,
	loggin: APP_ROUTES.login.en,
	success: APP_ROUTES.home.en,
	profile: APP_ROUTES.profile.en,
} as const satisfies RedirectedUrls;

export { APP_ROUTES, REDIRECTED_URLS };
export type { RouteMap, RouteKey, CanonicalHref };
