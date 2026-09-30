import React from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import GameIcon from '@/features/game/components/GameIcons';
import { WeaponCardProps } from '../../types/wiki';

export const WeaponCard = ({ id, recommendedTomes, affectedBy }: WeaponCardProps) => {
	const t = useTranslations('wiki');
	const key = `weapons.${id}` as const;

	type MessageKey = Parameters<typeof t.has>[0];

	return (
		<Card className='h-full flex flex-col bg-card text-card-foreground border-border'>
			<CardHeader className='flex flex-row items-center gap-4 pb-2'>
				<div className='p-2 rounded-lg bg-muted border border-border'>
					<GameIcon name={id} size={40} className='stroke-primary' />
				</div>
				<div>
					<CardTitle className='text-xl font-bold text-primary'>
						{t(`${key}.name`)}
					</CardTitle>
					<Badge
						variant='outline'
						className='mt-1 border-primary/30 text-primary uppercase text-[10px] tracking-wider'>
						{t(`${key}.type`)}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className='space-y-4 flex-1 flex flex-col justify-between pt-2'>
				<p className='text-sm text-muted-foreground'>{t(`${key}.description`)}</p>

				<div className='space-y-2 bg-muted/40 p-3 rounded-md border border-border'>
					<span className='text-xs font-semibold uppercase text-muted-foreground block'>
						{t('labels.behavior')}
					</span>
					<p className='text-xs text-foreground/90'>{t(`${key}.behavior`)}</p>
				</div>

				<div className='space-y-2'>
					<span className='text-xs font-semibold uppercase text-muted-foreground block'>
						{t('labels.affinities')}
					</span>
					<TooltipProvider delayDuration={150}>
						<div className='flex flex-wrap gap-1.5'>
							{affectedBy.map((item) => {
								const effectKey =
									`${key}.effects.${item.stat}` as MessageKey;
								const hasEffect = t.has(effectKey);
								const effectText = hasEffect ? t(effectKey) : null;

								const badgeContent = (
									<Badge
										variant='secondary'
										className='text-xs transition-colors hover:bg-secondary/80'>
										{t(`stats.${item.stat}`)}
										{item.affinity !== undefined && (
											<span
												className={`ml-1 font-bold ${
													item.affinity > 1
														? 'text-primary'
														: 'text-muted-foreground'
												}`}>
												({item.affinity}x)
											</span>
										)}
									</Badge>
								);

								return effectText ? (
									<Tooltip key={item.stat}>
										<TooltipTrigger asChild>
											{badgeContent}
										</TooltipTrigger>
										<TooltipContent
											side='top'
											className='max-w-xs text-xs bg-popover text-popover-foreground border-border'>
											<p>{effectText}</p>
										</TooltipContent>
									</Tooltip>
								) : (
									<React.Fragment key={item.stat}>
										{badgeContent}
									</React.Fragment>
								);
							})}
						</div>
					</TooltipProvider>
				</div>

				<div className='space-y-2 pt-2 border-t border-border'>
					<span className='text-xs font-semibold uppercase text-primary block'>
						{t('labels.bestTomes')}
					</span>
					<div className='flex items-center gap-2 flex-wrap'>
						{recommendedTomes.map((tomeId) => (
							<div
								key={tomeId}
								className='flex items-center gap-1.5 bg-muted px-2 py-1 rounded border border-border'>
								<GameIcon
									name={tomeId}
									size={18}
									className='stroke-primary'
								/>
								<span className='text-xs capitalize text-foreground'>
									{t(`tomes.${tomeId}.name`)}
								</span>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
