import { getTranslations } from 'next-intl/server';
import Nav from '@/components/customs/Nav';
import LocaleSwitcher from '@/components/customs/LocaleSwitcher';
import { PageButton } from './_buttons';

export default async function Home() {
	const t = await getTranslations('home');

	return (
		<main>
			<h1>{t('welcome')}</h1>
			<LocaleSwitcher path={'home'} />
			<Nav />
			<PageButton />
		</main>
	);
}
