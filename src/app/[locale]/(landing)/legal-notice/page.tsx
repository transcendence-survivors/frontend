import { useFormatter, useTranslations } from 'next-intl';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

const sectionKeys = [
	'publisher',
	'director',
	'hosting',
	'intellectual_property',
	'user_content',
	'personal_data',
	'cookies',
	'liability',
	'governing_law',
] as const;

const LAST_UPDATE = new Date('2026-09-29');

export default function LegalNoticePage() {
	const t = useTranslations('landing.legal');
	const format = useFormatter();

	return (
		<>
			<SiteHeader />
			<main className='max-w-3xl mx-auto px-4 py-20'>
				<div className='text-center mb-16'>
					<p className='text-sm tracking-[0.3em] text-primary mb-6 uppercase font-mono'>
						{t('kicker')}
					</p>
					<h1 className='heading-1 text-foreground'>{t('title')}</h1>
					<p className='font-mono text-xs text-muted-foreground mt-6'>
						{t('last_update', {
							date: format.dateTime(LAST_UPDATE, { dateStyle: 'long' }),
						})}
					</p>
				</div>
				<div className='border border-border'>
					{sectionKeys.map((key, i) => (
						<section
							key={key}
							className='p-6 sm:p-10 border-b border-border last:border-b-0'>
							<p className='font-mono text-xs tracking-[0.2em] text-muted-foreground mb-3'>
								{String(i + 1).padStart(2, '0')}
							</p>
							<h2 className='text-xl font-bold text-foreground mb-4'>
								{t(`sections.${key}.title`)}
							</h2>
							<div className='space-y-3 text-muted-foreground leading-relaxed'>
								{t.rich(`sections.${key}.body`, {
									p: (chunks) => <p>{chunks}</p>,
								})}
							</div>
						</section>
					))}
				</div>
			</main>
			<SiteFooter />
		</>
	);
}
