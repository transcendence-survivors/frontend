import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';

const faqKeys = [
	'min_specs',
	'too_dark',
	'desync',
	'glow',
	'standing_still',
	'block',
] as const;

export default function FaqAccordion() {
	const t = useTranslations('landing.support');

	return (
		<div className='mt-16'>
			<p className='font-mono text-xs tracking-[0.2em] text-muted-foreground mb-4 uppercase'>
				{t('faq_title')}
			</p>
			<Accordion
				type='single'
				collapsible
				className='border border-border rounded-sm px-6'>
				{faqKeys.map((key) => (
					<AccordionItem key={key} value={key}>
						<AccordionTrigger>
							<div className='flex items-center gap-4'>
								<span className='font-mono text-xs border border-border rounded-sm px-2 py-0.5 text-muted-foreground'>
									{t(`faq.${key}.category`)}
								</span>
								<span>{t(`faq.${key}.question`)}</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className='pl-[calc(4.5rem)] text-muted-foreground'>
							{t(`faq.${key}.answer`)}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
