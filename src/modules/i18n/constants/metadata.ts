import { Metadata } from 'next';
import { Locale } from './locales';

const SITE_NAME = 'Light Keepers';
const SITE_URL = 'https://example.com';
const IMAGE_URL = `${SITE_URL}/images/lightkeepers.png`;

export const METADATA = {
	fr: {
		title: {
			default: `${SITE_NAME} | Réseau Social & Compendium de Survie`,
			template: `%s | ${SITE_NAME}`,
		},
		description:
			'Rejoignez la communauté Light Keepers : partagez vos posts, discutez en salons de chat (MP & groupes), inspectez les profils et stats des joueurs, et consultez le wiki des armes et tomes.',
		keywords: [
			'Light Keepers',
			'réseau social gaming',
			'communauté de joueurs',
			'compendium armes et tomes',
			'wiki jeu de survie',
			'salons de chat gaming',
			'profils et statistiques joueurs',
			'synergies armes',
			'stratégies de survie',
			'partage de builds',
		],
		openGraph: {
			title: `${SITE_NAME} - Communauté, Stats & Wiki de Survie`,
			description:
				'Échangez avec les joueurs, créez des salons de chat, analysez les statistiques de profil et maîtrisez le compendium des armes et tomes.',
			url: `${SITE_URL}/fr`,
			siteName: SITE_NAME,
			locale: 'fr_FR',
			type: 'website',
			images: [
				{
					url: IMAGE_URL,
					secureUrl: IMAGE_URL,
					width: 1200,
					height: 630,
					alt: 'Aperçu de Light Keepers',
					type: 'image/jpg',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@lightkeepers',
			title: `${SITE_NAME} | Réseau Social & Guide de Survie`,
			description:
				'Échangez avec les joueurs, créez des salons de chat, analysez les profils et maîtrisez le compendium des armes.',
			creator: '@lightkeepers',
			images: [
				{
					url: IMAGE_URL,
					alt: 'Aperçu de Light Keepers',
					width: 1200,
					height: 630,
				},
			],
		},
	},
	en: {
		title: {
			default: `${SITE_NAME} | Player Network & Survival Compendium`,
			template: `%s | ${SITE_NAME}`,
		},
		description:
			'Join the Light Keepers community: share posts, chat in custom rooms (DMs & group channels with roles), inspect player stats, and master the weapon and tome wiki.',
		keywords: [
			'Light Keepers',
			'gaming social network',
			'survival game community',
			'weapon and tome wiki',
			'player stats and profiles',
			'gaming chat rooms',
			'weapon synergies',
			'build strategies',
			'co-op gaming network',
		],
		openGraph: {
			title: `${SITE_NAME} - Community, Stats & Game Wiki`,
			description:
				'Connect with players, chat in dedicated rooms, inspect profile stats, and master weapon synergies.',
			url: `${SITE_URL}/en`,
			siteName: SITE_NAME,
			locale: 'en_US',
			type: 'website',
			images: [
				{
					url: IMAGE_URL,
					secureUrl: IMAGE_URL,
					width: 1200,
					height: 630,
					alt: 'Preview of Light Keepers',
					type: 'image/jpg',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@lightkeepers',
			title: `${SITE_NAME} | Player Network & Game Guide`,
			description:
				'Connect with players, chat in dedicated rooms, inspect profile stats, and master weapon synergies.',
			creator: '@lightkeepers',
			images: [
				{
					url: IMAGE_URL,
					alt: 'Preview of Light Keepers',
					width: 1200,
					height: 630,
				},
			],
		},
	},
	de: {
		title: {
			default: `${SITE_NAME} | Spieler-Netzwerk & Überlebens-Kompendium`,
			template: `%s | ${SITE_NAME}`,
		},
		description:
			'Werde Teil der Light Keepers Community: Teile Beiträge, chatte in Gruppenräumen, analysiere Spieler-Statistiken und entdecke das Waffen- und Buch-Wiki.',
		keywords: [
			'Light Keepers',
			'Gaming Soziales Netzwerk',
			'Survival Gaming Community',
			'Waffen und Buch Wiki',
			'Spieler Statistiken',
			'Gaming Chaträume',
			'Waffen Synergien',
			'Überlebensstrategien',
		],
		openGraph: {
			title: `${SITE_NAME} - Community, Stats & Spiel-Wiki`,
			description:
				'Verbinde dich mit Spielern, chatte in eigenen Räumen, vergleiche Statistiken und meistere das Waffen-Kompendium.',
			url: `${SITE_URL}/de`,
			siteName: SITE_NAME,
			locale: 'de_DE',
			type: 'website',
			images: [
				{
					url: IMAGE_URL,
					secureUrl: IMAGE_URL,
					width: 1200,
					height: 630,
					alt: 'Vorschau von Light Keepers',
					type: 'image/jpg',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@lightkeepers',
			title: `${SITE_NAME} | Spieler-Netzwerk & Spiel-Wiki`,
			description:
				'Verbinde dich mit Spielern, chatte in eigenen Räumen, vergleiche Statistiken und meistere das Waffen-Kompendium.',
			creator: '@lightkeepers',
			images: [
				{
					url: IMAGE_URL,
					alt: 'Vorschau von Light Keepers',
					width: 1200,
					height: 630,
				},
			],
		},
	},
	che: {
		title: {
			default: `${SITE_NAME} | Spieler-Netzwerk & Überlebens-Kompendium`,
			template: `%s | ${SITE_NAME}`,
		},
		description:
			'Werde Teil der Light Keepers Community: Teile Beiträge, chatte in Gruppenräumen, analysiere Spieler-Statistiken und entdecke das Waffen- und Buch-Wiki.',
		keywords: [
			'Light Keepers',
			'Gaming Soziales Netzwerk',
			'Survival Gaming Community',
			'Waffen und Buch Wiki',
			'Spieler Statistiken',
			'Gaming Chaträume',
			'Waffen Synergien',
			'Überlebensstrategien',
		],
		openGraph: {
			title: `${SITE_NAME} - Community, Stats & Spiel-Wiki`,
			description:
				'Verbinde dich mit Spielern, chatte in eigenen Räumen, vergleiche Statistiken und meistere das Waffen-Kompendium.',
			url: `${SITE_URL}/che`,
			siteName: SITE_NAME,
			locale: 'de_CH',
			type: 'website',
			images: [
				{
					url: IMAGE_URL,
					secureUrl: IMAGE_URL,
					width: 1200,
					height: 630,
					alt: 'Vorschau von Light Keepers',
					type: 'image/jpg',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@lightkeepers',
			title: `${SITE_NAME} | Spieler-Netzwerk & Spiel-Wiki`,
			description:
				'Verbinde dich mit Spielern, chatte in eigenen Räumen, vergleiche Statistiken und meistere das Waffen-Kompendium.',
			creator: '@lightkeepers',
			images: [
				{
					url: IMAGE_URL,
					alt: 'Vorschau von Light Keepers',
					width: 1200,
					height: 630,
				},
			],
		},
	},
	es: {
		title: {
			default: `${SITE_NAME} | Red Social y Compendio de Supervivencia`,
			template: `%s | ${SITE_NAME}`,
		},
		description:
			'Únete a la comunidad de Light Keepers: comparte publicaciones, chatea en salas de grupo o DMs, inspecciona estadísticas de jugadores y explora la wiki de armas y tomos.',
		keywords: [
			'Light Keepers',
			'red social de videojuegos',
			'comunidad de supervivencia',
			'wiki de armas y tomos',
			'estadísticas de jugadores',
			'salas de chat de juegos',
			'sinergias de armas',
			'estrategias de juego',
		],
		openGraph: {
			title: `${SITE_NAME} - Comunidad, Stats y Wiki`,
			description:
				'Conecta con otros jugadores, chatea en salas con roles, analiza perfiles y domina las sinergias de armas.',
			url: `${SITE_URL}/es`,
			siteName: SITE_NAME,
			locale: 'es_ES',
			type: 'website',
			images: [
				{
					url: `${SITE_URL}/static/og-image-es.jpg`,
					secureUrl: `${SITE_URL}/static/og-image-es.jpg`,
					width: 1200,
					height: 630,
					alt: 'Vista previa de Light Keepers',
					type: 'image/jpg',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@lightkeepers',
			title: `${SITE_NAME} | Red Social y Guía de Supervivencia`,
			description:
				'Conecta con otros jugadores, chatea en salas con roles, analiza perfiles y domina las sinergias de armas.',
			creator: '@lightkeepers',
			images: [
				{
					url: `${SITE_URL}/static/og-image-es.jpg`,
					alt: 'Vista previa de Light Keepers',
					width: 1200,
					height: 630,
				},
			],
		},
	},
	it: {
		title: {
			default: `${SITE_NAME} | Social Network e Compendio di Sopravvivenza`,
			template: `%s | ${SITE_NAME}`,
		},
		description:
			'Unisciti alla community di Light Keepers: condividi post, chatta in stanze dedicate (DM e gruppi con ruoli), analizza le statistiche dei giocatori ed esplora il wiki di armi e tomi.',
		keywords: [
			'Light Keepers',
			'social network gaming',
			'community di sopravvivenza',
			'wiki armi e tomi',
			'statistiche giocatori',
			'stanze di chat gaming',
			'sinergie armi',
			'strategie di gioco',
		],
		openGraph: {
			title: `${SITE_NAME} - Community, Stats e Wiki`,
			description:
				'Connettiti con gli altri giocatori, chatta in stanze con ruoli, analizza i profili e domina il compendio delle armi.',
			url: `${SITE_URL}/it`,
			siteName: SITE_NAME,
			locale: 'it_IT',
			type: 'website',
			images: [
				{
					url: `${SITE_URL}/static/og-image-it.jpg`,
					secureUrl: `${SITE_URL}/static/og-image-it.jpg`,
					width: 1200,
					height: 630,
					alt: 'Anteprima di Light Keepers',
					type: 'image/jpg',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@lightkeepers',
			title: `${SITE_NAME} | Social Network e Guida di Gioco`,
			description:
				'Connettiti con gli altri giocatori, chatta in stanze con ruoli, analizza i profili e domina il compendio delle armi.',
			creator: '@lightkeepers',
			images: [
				{
					url: `${SITE_URL}/static/og-image-it.jpg`,
					alt: 'Anteprima di Light Keepers',
					width: 1200,
					height: 630,
				},
			],
		},
	},
} as const satisfies Record<Locale, Metadata>;

export default METADATA;
