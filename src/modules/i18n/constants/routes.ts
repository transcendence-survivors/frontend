import { Locale } from './locales';
import { compileRoutes } from '../utils/compile';

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

	feed: {
		en: '/feed',
		de: '/feed',
		fr: '/fil-dactualite',
		es: '/alimentacion',
		che: '/feed',
		it: '/feed',
	},
	leaderboard: {
		en: '/leaderboard',
		de: '/rangliste',
		fr: '/classement',
		es: '/clasificacion',
		che: '/rangliste',
		it: '/classifica',
	},

	friends: {
		en: '/friends',
		de: '/freunde',
		fr: '/amis',
		es: '/amigos',
		che: '/freunde',
		it: '/amici',
	},
	friendsRequests: {
		en: '/friends/requests',
		de: '/freunde/anfragen',
		fr: '/amis/demandes',
		es: '/amigos/solicitudes',
		che: '/freunde/anfragen',
		it: '/amici/richieste',
	},

	search: {
		en: '/search',
		de: '/suche',
		fr: '/recherche',
		es: '/buscar',
		che: '/suche',
		it: '/ricerca',
	},
	chat: {
		en: '/chat',
		de: '/chat',
		fr: '/discussion',
		es: '/charla',
		che: '/chat',
		it: '/chat',
	},
	chatId: {
		en: '/chat/:id',
		de: '/chat/:id',
		fr: '/discussion/:id',
		es: '/charla/:id',
		che: '/chat/:id',
		it: '/chat/:id',
	},
	userName: {
		en: '/:username',
		de: '/:username',
		fr: '/:username',
		es: '/:username',
		che: '/:username',
		it: '/:username',
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

	postId: {
		en: '/posts/:id',
		de: '/beitraege/:id',
		fr: '/articles/:id',
		es: '/articulos/:id',
		che: '/beitraege/:id',
		it: '/articoli/:id',
	},
} as const);

type RouteMap = typeof APP_ROUTES;
type RouteKey = keyof RouteMap;
type CanonicalHref = RouteMap[RouteKey]['en'];

type HasMoreSegments<T extends string> =
	T extends `${string}:${infer Param}/${infer Rest}`
		? Param | ExtractParams<`/${Rest}`>
		: never;
type HasFinalParam<T extends string> = T extends `${string}:${infer Param}`
	? Param
	: never;
type ExtractParams<T extends string> =
	HasMoreSegments<T> extends never ? HasFinalParam<T> : HasMoreSegments<T>;
type RouteParams<K extends RouteKey> = ExtractParams<RouteMap[K]['en']>;
type Params<K extends RouteKey> =
	RouteParams<K> extends never ? undefined : Record<RouteParams<K>, string | number>;

type ParamRoutes = {
	[K in RouteKey as RouteParams<K> extends never ? never : K]: Params<K>;
};

type StaticRoutes = {
	[K in RouteKey as RouteParams<K> extends never ? K : never]: true;
};

type RoutesWithParams = keyof ParamRoutes;
type RoutesWithoutParams = keyof StaticRoutes;

type RedirectedUrls = Record<string, CanonicalHref> | { callbackKey: string };

const REDIRECTED_URLS = {
	callbackKey: 'callbackUrl',
	401: APP_ROUTES.login.en,
	login: APP_ROUTES.login.en,
	success: APP_ROUTES.home.en,
	profile: APP_ROUTES.profile.en,
} as const satisfies RedirectedUrls;
const COMPILED_ROUTES = compileRoutes(APP_ROUTES);
const STATIC_ROUTES = COMPILED_ROUTES.filter((r) => !r.isDynamic);
const DYNAMIC_ROUTES = COMPILED_ROUTES.filter((r) => r.isDynamic);

export { APP_ROUTES, REDIRECTED_URLS, STATIC_ROUTES, DYNAMIC_ROUTES, COMPILED_ROUTES };
export type {
	RouteMap,
	RouteKey,
	CanonicalHref,
	RouteParams,
	ParamRoutes,
	StaticRoutes,
	RoutesWithParams,
	RoutesWithoutParams,
};
