import { getTranslations } from 'next-intl/server';
import Nav from '@/components/customs/Nav';
import LocaleSwitcher from '@/components/customs/LocaleSwitcher';

export default async function Home() {
	const t = await getTranslations('home');

	return (
		<main>
			<h1>{t('welcome')}</h1>
			<LocaleSwitcher path={'home'} />
			<Nav />
		</main>
	);
}
