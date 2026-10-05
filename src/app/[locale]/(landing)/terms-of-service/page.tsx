import { useTranslations } from 'next-intl';
import LegalHeader from '../components/legal/LegalHeader';
import LegalSection from '../components/legal/LegalSection';
import { legalRichTags } from '../components/legal/legalRichTags';

const sections = [
	'editor',
	'publisher',
	'hosting',
	'acceptance',
	'account',
	'conduct',
	'content',
	'property',
	'availability',
	'liability',
	'termination',
	'changes',
	'contact',
] as const;

const team = [
	'Antoine Bonneau',
	'Benoît Cabocel',
	'Noa Fanizzi',
	'Thyanoui Lutz',
] as const;

export default function TermsOfServicePage() {
	const t = useTranslations('terms');

	return (
		<main>
			<div className='px-4 py-14'>
				<div className='max-w-5xl mx-auto space-y-8'>
					<LegalHeader
						kicker={t('kicker')}
						title={t('title')}
						updated={t('updated')}
					/>
					<div className='border border-border'>
						{sections.map((key, index) => (
							<LegalSection
								key={key}
								number={String(index + 1).padStart(2, '0')}
								title={t(`sections.${key}.title`)}>
								<p>
									{key === 'contact'
										? t.rich('sections.contact.body', legalRichTags)
										: t(`sections.${key}.body`)}
								</p>
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
			</div>
		</main>
	);
}
