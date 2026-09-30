import React from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GameIcon from '@/features/game/components/GameIcons';
import { TomeCardProps } from '../types';

export const TomeCard = ({
	id,
	target,
	baseStat,
	rarities,
	affectsWeapons = [],
}: TomeCardProps) => {
	const t = useTranslations('wiki');
	const key = `tomes.${id}` as const;

	return (
		<Card className='h-full flex flex-col bg-card text-card-foreground border-border'>
			<CardHeader className='flex flex-row items-center gap-4 pb-2'>
				<div className='p-2 rounded-lg bg-muted border border-border'>
					<GameIcon name={id} size={36} className='stroke-primary' />
				</div>
				<div>
					<CardTitle className='text-lg font-bold text-foreground'>
						{t(`${key}.name`)}
					</CardTitle>
					<div className='flex gap-2 mt-1'>
						<Badge variant='secondary' className='text-[10px] capitalize'>
							{t('labels.target')}: {t(`targets.${target}`)}
						</Badge>
						<Badge
							variant='outline'
							className='text-[10px] text-muted-foreground border-border'>
							{t('labels.baseValue')}: {baseStat}
						</Badge>
					</div>
				</div>
			</CardHeader>

			<CardContent className='space-y-4 flex-1 flex flex-col justify-between pt-2'>
				<p className='text-xs text-muted-foreground'>{t(`${key}.description`)}</p>

				<div className='space-y-1.5'>
					<span className='text-[11px] font-semibold uppercase text-muted-foreground block'>
						{t('labels.rarityValues')}
					</span>
					<div className='grid grid-cols-5 gap-1 text-center text-[10px]'>
						{rarities.map((r) => (
							<div
								key={r.rarity}
								className='bg-muted/60 p-1.5 rounded border border-border'>
								<div className='text-muted-foreground capitalize'>
									{t(`rarities.${r.rarity}`).slice(0, 3)}
								</div>
								<div className='font-mono font-bold text-primary mt-0.5'>
									{r.display}
								</div>
							</div>
						))}
					</div>
				</div>

				{affectsWeapons.length > 0 && (
					<div className='space-y-1 pt-2 border-t border-border'>
						<span className='text-[11px] font-semibold uppercase text-muted-foreground block'>
							{t('labels.affectedWeapons')}
						</span>
						<div className='flex flex-wrap gap-1'>
							{affectsWeapons.map((w) => (
								<Badge
									key={w}
									variant='secondary'
									className='text-muted-foreground text-[10px] capitalize'>
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
