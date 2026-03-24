import { getTranslations } from "next-intl/server";


export default async function Home() {
	const t = await getTranslations('home');

	return (
		<main>
			<h1>{t('welcome')}</h1>
		</main>
	);
}
