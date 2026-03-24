import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  localePrefix: {
	mode: 'always',
	prefixes: {
		'en-US': '/us',
		'de-AT': '/eu/at'
	}
  },
  pathnames: {
	'/': {
	  en: '/home',
	  de: '/startseite',
	  zh: '/主页',
	  fr: '/accueil'
	}
  }
});
