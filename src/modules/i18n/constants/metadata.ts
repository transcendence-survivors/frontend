import { type Locale } from './locales';
import type { Metadata } from 'next';

const SITE_NAME = 'Transcendence Survivors';

const METADATA = {
	fr: {
		title: SITE_NAME,
		description:
			"Le réseau social de survie ultime pour les passionnés de jeux vidéo et d'aventure.",
		keywords: [
			'reseau social',
			'communauté de joueurs',
			'aventure',
			'survie',
			'jeux vidéo',
			'partage de contenu',
			'interaction sociale',
			'gaming',
			'passionnés de jeux',
			'communauté en ligne',
			"partage d'expériences",
			'conseils de survie',
			'stratégies de jeu',
			'actualités du gaming',
			'événements de jeux vidéo',
			'groupes de discussion sur les jeux',
		],
		openGraph: {
			title: SITE_NAME,
			description:
				"Le réseau social de survie ultime pour les passionnés de jeux vidéo et d'aventure.",
			url: 'https://example.com/fr',
			siteName: SITE_NAME,
			type: 'website',
			images: [
				{
					url: 'https://example.com/static/og-image-fr.jpg',
					secureUrl: 'https://example.com/static/og-image-fr.jpg',
					width: 1200,
					height: 630,
					alt: 'Aperçu de Transcendence Survivors',
					type: 'image/jpg',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@transcendence_survivors',
			title: SITE_NAME,
			description:
				"Le réseau social de survie ultime pour les passionnés de jeux vidéo et d'aventure.",
			creator: '@transcendence_survivors',
			images: [
				{
					url: 'https://example.com/static/og-image-fr.jpg',
					alt: 'Aperçu de Transcendence Survivors',
					width: 1200,
					height: 630,
				},
			],
		},
	},
	en: {
		title: SITE_NAME,
		description:
			'The ultimate survival social network for gaming and adventure enthusiasts.',
		keywords: [
			'social network',
			'gaming community',
			'adventure',
			'survival',
			'video games',
			'content sharing',
			'social interaction',
			'gaming',
			'game enthusiasts',
			'online community',
			'sharing experiences',
			'survival tips',
			'game strategies',
			'gaming news',
			'video game events',
			'game discussion groups',
		],
		openGraph: {
			title: SITE_NAME,
			description:
				'The ultimate survival social network for gaming and adventure enthusiasts.',
			url: 'https://example.com/en',
			siteName: SITE_NAME,
			type: 'website',
			images: [
				{
					url: 'https://example.com/static/og-image-en.jpg',
					secureUrl: 'https://example.com/static/og-image-en.jpg',
					width: 1200,
					height: 630,
					alt: 'Preview of Transcendence Survivors',
					type: 'image/jpg',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@transcendence_survivors',
			title: SITE_NAME,
			description:
				'The ultimate survival social network for gaming and adventure enthusiasts.',
			creator: '@transcendence_survivors',
			images: [
				{
					url: 'https://example.com/static/og-image-en.jpg',
					alt: 'Preview of Transcendence Survivors',
				},
			],
		},
	},
	de: {
		title: SITE_NAME,
		description:
			'Das ultimative Überlebensnetzwerk für Gaming- und Abenteuer-Enthusiasten.',
		keywords: [
			'soziales Netzwerk',
			'Gaming-Community',
			'Abenteuer',
			'Überleben',
			'Videospiele',
			'Inhalte teilen',
			'soziale Interaktion',
			'Gaming',
			'Spielebegeisterte',
			'Online-Community',
			'Erfahrungen teilen',
			'Überlebenstipps',
			'Spielstrategien',
			'Gaming-News',
			'Videospiel-Events',
			'Spiele-Diskussionsgruppen',
		],
		openGraph: {
			title: SITE_NAME,
			description:
				'Das ultimative Überlebensnetzwerk für Gaming- und Abenteuer-Enthusiasten.',
			url: 'https://example.com/de',
			siteName: SITE_NAME,
			type: 'website',
			images: [
				{
					url: 'https://example.com/static/og-image-de.jpg',
					secureUrl: 'https://example.com/static/og-image-de.jpg',
					width: 1200,
					height: 630,
					alt: 'Vorschau von Transcendence Survivors',
					type: 'image/jpg',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@transcendence_survivors',
			title: SITE_NAME,
			description:
				'Das ultimative Überlebensnetzwerk für Gaming- und Abenteuer-Enthusiasten.',
			creator: '@transcendence_survivors',
			images: [
				{
					url: 'https://example.com/static/og-image-de.jpg',
					alt: 'Vorschau von Transcendence Survivors',
				},
			],
		},
	},
	che: {
		title: SITE_NAME,
		description: 'S ultimative Überläbes-Netzwärch für Gaming- und Abentüür-Fans.',
		keywords: [
			'soziales Netzwärch',
			'Gaming-Community',
			'Abentüür',
			'Überläbe',
			'Videogames',
			'Inhält teile',
			'sozials Mitenand',
			'Gaming',
			'Gamer',
			'Online-Community',
			'Erfahrige teile',
			'Überlebenstipps',
			'Spielstrategie',
			'Gaming-News',
			'Gaming-Events',
			'Diskussionsgruppe für Games',
		],
		openGraph: {
			title: SITE_NAME,
			description:
				'S ultimative Überläbes-Netzwärch für Gaming- und Abentüür-Fans.',
			url: 'https://example.com/che',
			siteName: SITE_NAME,
			type: 'website',
			images: [
				{
					url: 'https://example.com/static/og-image-che.jpg',
					secureUrl: 'https://example.com/static/og-image-che.jpg',
					width: 1200,
					height: 630,
					alt: 'Vorschau vo Transcendence Survivors',
					type: 'image/jpg',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@transcendence_survivors',
			title: SITE_NAME,
			description:
				'S ultimative Überläbes-Netzwärch für Gaming- und Abentüür-Fans.',
			creator: '@transcendence_survivors',
			images: [
				{
					url: 'https://example.com/static/og-image-che.jpg',
					alt: 'Vorschau vo Transcendence Survivors',
				},
			],
		},
	},
	es: {
		title: SITE_NAME,
		description:
			'La red social de supervivencia definitiva para los amantes de los videojuegos y la aventura.',
		keywords: [
			'red social',
			'comunidad gamer',
			'aventura',
			'supervivencia',
			'videojuegos',
			'compartir contenido',
			'interacción social',
			'gaming',
			'aficionados a los videojuegos',
			'comunidad en línea',
			'compartir experiencias',
			'consejos de supervivencia',
			'estrategias de juego',
			'noticias de videojuegos',
			'eventos de videojuegos',
			'grupos de discusión de juegos',
		],
		openGraph: {
			title: SITE_NAME,
			description:
				'La red social de supervivencia definitiva para los amantes de los videojuegos y la aventura.',
			url: 'https://example.com/es',
			siteName: SITE_NAME,
			type: 'website',
			images: [
				{
					url: 'https://example.com/static/og-image-es.jpg',
					secureUrl: 'https://example.com/static/og-image-es.jpg',
					width: 1200,
					height: 630,
					alt: 'Vista previa de Transcendence Survivors',
					type: 'image/jpg',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@transcendence_survivors',
			title: SITE_NAME,
			description:
				'La red social de supervivencia definitiva para los amantes de los videojuegos y la aventura.',
			creator: '@transcendence_survivors',
			images: [
				{
					url: 'https://example.com/static/og-image-es.jpg',
					alt: 'Vista previa de Transcendence Survivors',
				},
			],
		},
	},
	it: {
		title: SITE_NAME,
		description:
			'Il social network di sopravvivenza definitivo per gli appassionati di videogiochi e avventura.',
		keywords: [
			'social network',
			'community di gaming',
			'avventura',
			'sopravvivenza',
			'videogiochi',
			'condivisione di contenuti',
			'interazione sociale',
			'gaming',
			'appassionati di videogiochi',
			'community online',
			'condivisione di esperienze',
			'consigli di sopravvivenza',
			'strategie di gioco',
			'notizie sui videogiochi',
			'eventi di videogiochi',
			'gruppi di discussione sui giochi',
		],
		openGraph: {
			title: SITE_NAME,
			description:
				'Il social network di sopravvivenza definitivo per gli appassionati di videogiochi e avventura.',
			url: 'https://example.com/it',
			siteName: SITE_NAME,
			type: 'website',
			images: [
				{
					url: 'https://example.com/static/og-image-it.jpg',
					secureUrl: 'https://example.com/static/og-image-it.jpg',
					width: 1200,
					height: 630,
					alt: 'Anteprima di Transcendence Survivors',
					type: 'image/jpg',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@transcendence_survivors',
			title: SITE_NAME,
			description:
				'Il social network di sopravvivenza definitivo per gli appassionati di videogiochi e avventura.',
			creator: '@transcendence_survivors',
			images: [
				{
					url: 'https://example.com/static/og-image-it.jpg',
					alt: 'Anteprima di Transcendence Survivors',
				},
			],
		},
	},
} as const satisfies Record<Locale, Metadata>;

export default METADATA;
