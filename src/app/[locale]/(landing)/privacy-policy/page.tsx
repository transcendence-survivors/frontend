import { useTranslations } from 'next-intl';
import LegalHeader from '../components/legal/LegalHeader';
import LegalSection from '../components/legal/LegalSection';
import { legalRichTags } from '../components/legal/legalRichTags';

const sections = [
	'controller',
	'collected',
	'usage',
	'legalBasis',
	'sharing',
	'retention',
	'security',
	'cookies',
	'rights',
	'minors',
	'contact',
] as const;

export default function PrivacyPolicyPage() {
	const t = useTranslations('privacy');

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
							</LegalSection>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
