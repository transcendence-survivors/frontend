import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Cpu, SlidersHorizontal, Calculator } from 'lucide-react';
import { STAT_KEYS } from '@/features/game/data/stats';

export const WikiMechanics = () => {
	const t = useTranslations('wiki');

	type MessageKey = Parameters<typeof t>[0];

	return (
		<section className='space-y-6'>
			<Card className='bg-card border-border text-card-foreground'>
				<CardHeader className='pb-3'>
					<CardTitle className='text-lg font-bold flex items-center gap-2 text-primary'>
						<Cpu className='w-5 h-5 text-primary' />
						{t('combatRules.title')}
					</CardTitle>
				</CardHeader>
				<CardContent className='grid grid-cols-1 md:grid-cols-3 gap-4 text-xs'>
					<div className='p-3 rounded-lg bg-muted/40 border border-border space-y-1'>
						<span className='font-semibold text-foreground flex items-center gap-1.5'>
							<SlidersHorizontal className='w-3.5 h-3.5 text-primary' />
							{t('combatRules.affinityTitle')}
						</span>
						<p className='text-muted-foreground leading-relaxed'>
							{t('combatRules.affinityDesc')}
						</p>
					</div>

					<div className='p-3 rounded-lg bg-muted/40 border border-border space-y-1'>
						<span className='font-semibold text-foreground flex items-center gap-1.5'>
							<ShieldCheck className='w-3.5 h-3.5 text-primary' />
							{t('combatRules.armorTitle')}
						</span>
						<p className='text-muted-foreground leading-relaxed'>
							{t('combatRules.armorDesc')}
						</p>
					</div>

					<div className='p-3 rounded-lg bg-muted/40 border border-border space-y-1'>
						<span className='font-semibold text-foreground flex items-center gap-1.5'>
							<Calculator className='w-3.5 h-3.5 text-primary' />
							{t('combatRules.tomeLimitTitle')}
						</span>
						<p className='text-muted-foreground leading-relaxed'>
							age
							{t('combatRules.tomeLimitDesc')}
						</p>
					</div>
				</CardContent>
			</Card>

			<Card className='bg-card border-border text-card-foreground'>
				<CardHeader>
					<CardTitle className='text-lg font-bold text-foreground'>
						{t('stats.title')}
					</CardTitle>
				</CardHeader>
				<CardContent className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs'>
					{STAT_KEYS.map((key) => {
						const descKey = `stats.explanations.${key}.desc` as MessageKey;
						const formulaKey =
							`stats.explanations.${key}.formula` as MessageKey;

						return (
							<article
								key={key}
								className='p-4 bg-muted/30 border border-border rounded-lg flex flex-col justify-between gap-3'>
								<div className='space-y-1.5'>
									<div className='flex items-center justify-between'>
										<h3 className='font-bold text-primary text-sm'>
											{t(`stats.${key}`)}
										</h3>
										<Badge
											variant='outline'
											className='text-[10px] font-mono border-border text-muted-foreground'>
											{t('labels.key')}: {key}
										</Badge>
									</div>
									<p className='text-muted-foreground leading-relaxed text-xs'>
										{t(descKey)}
									</p>
								</div>

								<div className='p-2 bg-background/60 border border-border/80 rounded font-mono text-[11px] text-foreground/90'>
									<span className='text-[10px] uppercase font-sans text-muted-foreground block font-semibold mb-0.5'>
										{t('labels.formula')}
									</span>
									{t(formulaKey)}
								</div>
							</article>
						);
					})}
				</CardContent>
			</Card>
		</section>
	);
};
