import { useTranslations } from 'next-intl';

export default function LoreHero() {
	const t = useTranslations('landing.lore');

	return (
		<div className='text-center max-w-3xl mx-auto pt-20 pb-16 px-4'>
			<p className='text-sm tracking-[0.3em] text-primary mb-6 uppercase font-mono'>
				{t('kicker')}
			</p>
			<h1 className='heading-1 mb-6 text-foreground'>{t('title')}</h1>
			<p className='text-muted-foreground'>
				{t.rich('intro', { em: (chunks) => <em>{chunks}</em> })}
			</p>
		</div>
	);
}
