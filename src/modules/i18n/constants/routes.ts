import { resetPassword } from '@/features/auth/api/reset-password.api.';
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
	resetPassword: {
		en: '/reset-password',
		de: '/passwort-zuruecksetzen',
		fr: '/reinitialiser-mot-de-passe',
		es: '/restablecer-contrasena',
		che: '/passwort-zuruecksetzen',
		it: '/reimpostare-password',
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
	feed: {
		en: '/feed',
		de: '/feed',
		fr: '/fil-dactualite',
		es: '/alimentacion',
		che: '/feed',
		it: '/feed',
	},
	friends: {
		en: '/friends',
		de: '/freunde',
		fr: '/amis',
		es: '/amigos',
		che: '/freunde',
		it: '/amici',
	},
	chat: {
		en: '/chat',
		de: '/chat',
		fr: '/discussion',
		es: '/charla',
		che: '/chat',
		it: '/chat',
	},
	search: {
		en: '/search',
		de: '/suche',
		fr: '/recherche',
		es: '/buscar',
		che: '/suche',
		it: '/ricerca',
	},

	profile: {
		en: '/profile',
		de: '/profil',
		fr: '/profil',
		es: '/perfil',
		che: '/profil',
		it: '/profilo',
	},
	profilePosts: {
		en: '/profile/posts',
		de: '/profil/beitraege',
		fr: '/profil/articles',
		es: '/perfil/articulos',
		che: '/profil/beitraege',
		it: '/profilo/articoli',
	},
	profileComments: {
		en: '/profile/comments',
		de: '/profil/kommentare',
		fr: '/profil/commentaires',
		es: '/perfil/comentarios',
		che: '/profil/kommentare',
		it: '/profilo/commenti',
	},
	profileLikes: {
		en: '/profile/likes',
		de: '/profil/likes',
		fr: '/profil/aime',
		es: '/perfil/likes',
		che: '/profil/likes',
		it: '/profilo/likes',
	},
	profileFavourites: {
		en: '/profile/favourites',
		de: '/profil/favoriten',
		fr: '/profil/favoris',
		es: '/perfil/favoritos',
		che: '/profil/favoriten',
		it: '/profilo/preferiti',
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
	login: APP_ROUTES.login.en,
	success: APP_ROUTES.home.en,
	profile: APP_ROUTES.profile.en,
} as const satisfies RedirectedUrls;

export { APP_ROUTES, REDIRECTED_URLS };
export type { RouteMap, RouteKey, CanonicalHref };
