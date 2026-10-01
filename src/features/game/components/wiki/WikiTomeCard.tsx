import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GameIcon from '@/features/game/components/GameIcons';
import { TomeCardProps } from '../../types/wiki';

const WikiTomeCard = ({
	id,
	target,
	baseStat,
	rarities,
	affectsWeapons = [],
}: TomeCardProps) => {
	const t = useTranslations('wiki');
	const key = `tomes.${id}` as const;

	return (
		<Card className='h-full flex flex-col bg-card/60 hover:bg-muted border-border shadow-sm rounded-xl transition-all duration-200'>
			<CardHeader className='flex flex-row items-center gap-3.5 pb-2'>
				<div className='p-2.5 rounded-xl bg-muted/50 border border-border shrink-0'>
					<GameIcon name={id} size={40} className='stroke-primary' />
				</div>
				<div className='min-w-0 flex-1 space-y-1'>
					<CardTitle className='text-xl font-bold text-foreground truncate'>
						{t(`${key}.name`)}
					</CardTitle>
					<div className='flex items-center gap-1.5 flex-wrap'>
						<Badge
							variant='secondary'
							className='text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 capitalize'>
							{t('labels.target')}: {t(`targets.${target}`)}
						</Badge>
						<Badge
							variant='outline'
							className='text-[10px] font-semibold tracking-wider text-muted-foreground border-border px-2 py-0.5'>
							{t('labels.baseValue')}: {baseStat}
						</Badge>
					</div>
				</div>
			</CardHeader>

			<CardContent className='space-y-4 flex-1 flex flex-col justify-between pt-2'>
				<p className='text-sm text-muted-foreground leading-relaxed'>
					{t(`${key}.description`)}
				</p>

				<div className='space-y-1.5 bg-muted/40 p-3 rounded-xl border border-border'>
					<span className='text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block'>
						{t('labels.rarityValues')}
					</span>
					<div className='grid grid-cols-5 gap-1.5 text-center text-xs'>
						{rarities.map((r) => (
							<div
								key={r.rarity}
								className='bg-muted/60 p-1.5 rounded-lg border border-border flex flex-col items-center justify-center'>
								<span className='text-[10px] font-medium text-muted-foreground capitalize truncate w-full'>
									{t(`rarities.${r.rarity}`).slice(0, 3)}
								</span>
								<strong className='font-mono font-bold text-primary text-xs mt-0.5'>
									{r.display}
								</strong>
							</div>
						))}
					</div>
				</div>

				{affectsWeapons.length > 0 && (
					<div className='space-y-2 pt-3 border-t border-border'>
						<span className='text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block'>
							{t('labels.affectedWeapons')}
						</span>
						<div className='flex flex-wrap gap-1.5'>
							{affectsWeapons.map((w) => (
								<Badge
									key={w}
									variant='secondary'
									className='text-xs font-medium text-foreground/90 capitalize px-2 py-0.5'>
									{t(`weapons.${w}.name`)}
								</Badge>
							))}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default WikiTomeCard;
