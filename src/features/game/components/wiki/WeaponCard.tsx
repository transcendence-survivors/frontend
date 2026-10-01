'use client';

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
		<Card className='h-full flex flex-col bg-card/60 hover:bg-accent/40 border-border shadow-sm rounded-xl transition-all duration-200'>
			<CardHeader className='flex flex-row items-center gap-3.5 pb-2'>
				<div className='p-2.5 rounded-xl bg-muted/50 border border-border shrink-0'>
					<GameIcon name={id} size={40} className='stroke-primary' />
				</div>
				<div className='min-w-0 flex-1 space-y-1'>
					<CardTitle className='text-xl font-bold text-foreground truncate'>
						{t(`${key}.name`)}
					</CardTitle>
					<Badge
						variant='outline'
						className='border-primary/30 text-primary uppercase text-[10px] font-semibold tracking-wider px-2 py-0.5'>
						{t(`${key}.type`)}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className='space-y-4 flex-1 flex flex-col justify-between pt-2'>
				<p className='text-sm text-muted-foreground leading-relaxed'>
					{t(`${key}.description`)}
				</p>

				<div className='space-y-1.5 bg-muted/40 p-3 rounded-xl border border-border'>
					<span className='text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block'>
						{t('labels.behavior')}
					</span>
					<p className='text-xs text-foreground/90 leading-normal'>
						{t(`${key}.behavior`)}
					</p>
				</div>

				<div className='space-y-2'>
					<span className='text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block'>
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
										className='text-xs font-medium transition-colors hover:bg-secondary/80 px-2 py-0.5'>
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
											className='max-w-xs text-xs bg-popover text-popover-foreground border-border shadow-md'>
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

				<div className='space-y-2 pt-3 border-t border-border'>
					<span className='text-[10px] font-semibold uppercase tracking-wider text-primary block'>
						{t('labels.bestTomes')}
					</span>
					<div className='flex items-center gap-1.5 flex-wrap'>
						{recommendedTomes.map((tomeId) => (
							<div
								key={tomeId}
								className='flex items-center gap-1.5 bg-muted/60 px-2.5 py-1 rounded-lg border border-border'>
								<GameIcon
									name={tomeId}
									size={18}
									className='stroke-primary shrink-0'
								/>
								<span className='text-xs font-medium capitalize text-foreground'>
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
