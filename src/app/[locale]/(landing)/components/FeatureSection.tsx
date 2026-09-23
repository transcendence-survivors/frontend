import { useTranslations } from 'next-intl';
import { BentoGrid } from '@/components/ui/bento-grid';

export default function FeatureSection() {
	const t = useTranslations('landing.features');

	const features = [
		{
			name: t('lantern.name'),
			description: t('lantern.description'),
			gradient: 'from-amber-500/40 via-amber-500/10 to-transparent',
		},
		{
			name: t('strata.name'),
			description: t('strata.description'),
			gradient: 'from-yellow-500/30 via-amber-500/10 to-transparent',
		},
		{
			name: t('forgotten.name'),
			description: t('forgotten.description'),
			gradient: 'from-neutral-500/30 via-stone-500/10 to-transparent',
		},
		{
			name: t('vigil.name'),
			description: t('vigil.description'),
			gradient: 'from-orange-400/40 via-amber-500/10 to-transparent',
		},
	];

	return (
		<div className='mb-20 mt-16 sm:mt-24'>
			<p
				className={
					'font-mono text-xs tracking-[0.2em] ' + 'text-primary mb-4 uppercase'
				}>
				{t('kicker')}
			</p>
			<h2 className={'text-2xl sm:text-3xl font-bold text-foreground ' + 'max-w-xl mb-10'}>
				{t('title')}
			</h2>
			<BentoGrid className='grid-cols-1 md:grid-cols-2 auto-rows-auto gap-px bg-border border border-border'>
				{features.map((feature) => (
					<div key={feature.name} className='bg-background p-6 sm:p-8'>
						<div
							className={'h-28 mb-6 bg-gradient-to-br ' + feature.gradient}
						/>
						<h3 className={'text-lg font-semibold ' + 'text-foreground mb-2'}>
							{feature.name}
						</h3>
						<p
							className={
								'text-sm text-muted-foreground ' + 'leading-relaxed'
							}>
							{feature.description}
						</p>
					</div>
				))}
			</BentoGrid>
		</div>
	);
}
