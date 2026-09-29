import { useTranslations } from 'next-intl';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
	{ key: 'requirements', category: 'technical' },
	{ key: 'lag', category: 'technical' },
	{ key: 'circle', category: 'gameplay' },
	{ key: 'power', category: 'gameplay' },
	{ key: 'win', category: 'gameplay' },
	{ key: 'block', category: 'account' },
] as const;

export default function FaqAccordion() {
	const t = useTranslations('support');

	return (
		<div className='mt-16'>
			<p className='font-mono text-xs tracking-[0.2em] text-muted-foreground mb-4 uppercase'>
				{t('faq_title')}
			</p>
			<Accordion
				type='single'
				collapsible
				className='border border-border rounded-sm px-6'>
				{faqItems.map((item) => (
					<AccordionItem key={item.key} value={item.key}>
						<AccordionTrigger>
							<div className='flex items-center gap-4'>
								<span className='font-mono text-xs border border-border rounded-sm px-2 py-0.5 text-muted-foreground'>
									{t(`categories.${item.category}.name`)}
								</span>
								<span>{t(`faq.${item.key}.question`)}</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className='pl-[calc(4.5rem)] text-muted-foreground'>
							{t(`faq.${item.key}.answer`)}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
