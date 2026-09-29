import { Card } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
	const t = await getTranslations('settings.page');

	return (
		<main className='sr-only sm:not-sr-only h-main sm:p-4 flex flex-col items-center justify-center'>
			<Card className='max-w-md w-full p-6'>
				<section className='space-y-4'>
					<h1 className='text-3xl font-bold'>{t('title')}</h1>
					<div className='text-muted-foreground text-sm'>
						<p>{t('description')}</p>
					</div>
				</section>
			</Card>
		</main>
	);
}
