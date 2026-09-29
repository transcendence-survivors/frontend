import { useTranslations } from 'next-intl';
import I18nLink from '@/modules/i18n/components/I18nLink';
import LegalSection from './components/LegalSection';

const sections = [
	'editor',
	'publisher',
	'hosting',
	'property',
	'data',
	'cookies',
	'contact',
] as const;

const team = [
	'Antoine Bonneau',
	'Benoît Cabocel',
	'Noa Fanizzi',
	'Thyanoui Lutz',
] as const;

const GITHUB_URL = 'https://github.com/transcendence-survivors';

export default function LegalNoticePage() {
	const t = useTranslations('legal');

	return (
		<main>
			<div className='max-w-4xl mx-auto px-4 py-20'>
				<div className='text-center mb-16'>
					<p className='text-sm tracking-[0.3em] text-primary mb-6 uppercase font-mono'>
						{t('kicker')}
					</p>
					<h1 className='heading-1 text-foreground mb-6'>{t('title')}</h1>
					<p className='font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase'>
						{t('updated')}
					</p>
				</div>
				<div className='border border-border'>
					{sections.map((key, index) => (
						<LegalSection
							key={key}
							number={`0${index + 1}`}
							title={t(`sections.${key}.title`)}>
							{key === 'contact' ? (
								<p>
									{t.rich('sections.contact.body', {
										support: (chunks) => (
											<I18nLink
												href='support'
												className='text-primary hover:underline'>
												{chunks}
											</I18nLink>
										),
										github: (chunks) => (
											<a
												href={GITHUB_URL}
												target='_blank'
												rel='noopener noreferrer'
												className='text-primary hover:underline'>
												{chunks}
											</a>
										),
									})}
								</p>
							) : (
								<p>{t(`sections.${key}.body`)}</p>
							)}
							{key === 'editor' && (
								<ul className='flex flex-wrap gap-2 mt-6'>
									{team.map((name) => (
										<li
											key={name}
											className='font-mono text-xs border border-border rounded-sm px-2 py-1 text-foreground'>
											{name}
										</li>
									))}
								</ul>
							)}
						</LegalSection>
					))}
				</div>
			</div>
		</main>
	);
}
