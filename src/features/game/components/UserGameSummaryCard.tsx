'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { GameIcon } from './GameIcons';
import { UserGameSummary } from '../types/summary';
import { MAP_WEAPON_KIND_TO_ICON } from '../types/icons';
import DisplayDate from '@/components/ui/date';

interface Props {
	summary: UserGameSummary;
}

function formatDuration(seconds: number): string {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins}m ${secs.toString().padStart(2, '0')}s`;
}

export const UserGameSummaryCard = ({ summary }: Props) => {
	const t = useTranslations('userSummary');
	const tWiki = useTranslations('wiki');

	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between pb-4'>
				<div className='space-y-1'>
					<CardTitle className='text-xl font-bold'>{t('title')}</CardTitle>
					<CardDescription className='text-xs text-muted-foreground flex items-center gap-1'>
						<span>{t('lastPlayed')} :</span>
						<DisplayDate
							date={summary.lastPlayedAt}
							formatOptions={{
								month: 'short',
								day: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
								year: 'numeric',
							}}
						/>
					</CardDescription>
				</div>
				<Badge
					variant='outline'
					className='border-border text-foreground font-semibold p-3'>
					{summary.totalGamesPlayed} {t('gamesPlayed')}
				</Badge>
			</CardHeader>

			<Separator />

			<CardContent className='space-y-6'>
				<div className='grid grid-cols-2 divide-border rounded-xl border border-border bg-muted/20 py-4 gap-y-4 shadow-sm lg:flex lg:grid-cols-4 lg:divide-x '>
					<div className='flex-1 text-center px-4 space-y-2'>
						<p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
							{t('totalKills')}
						</p>
						<p className='text-2xl lg:text-3xl font-black tracking-tight text-destructive'>
							{summary.totalKills.toLocaleString()}
						</p>
					</div>

					<div className='flex-1 text-center px-4 space-y-2'>
						<p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
							{t('totalSurvivalTime')}
						</p>
						<p className='text-2xl lg:text-3xl font-black tracking-tight text-primary'>
							{formatDuration(summary.totalSurvivalTime)}
						</p>
					</div>

					<div className='flex-1 text-center px-4 space-y-2'>
						<p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
							{t('highestSurvivalTime')}
						</p>
						<p className='text-2xl lg:text-3xl font-black tracking-tight text-chart-2'>
							{formatDuration(summary.highestSurvivalTime)}
						</p>
					</div>

					<div className='flex-1 text-center px-4 space-y-2'>
						<p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
							{t('highestKills')}
						</p>
						<p className='text-2xl lg:text-3xl font-black tracking-tight text-chart-3'>
							{summary.highestKills}
						</p>
					</div>
				</div>

				<div className='space-y-3'>
					<h3 className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
						{t('weaponsUsed')}
					</h3>

					{summary.weaponSummaries.length === 0 ? (
						<p className='text-sm text-muted-foreground italic'>
							{t('noWeapons')}
						</p>
					) : (
						<div className='space-y-2'>
							{summary.weaponSummaries.map((weapon) => {
								const iconName = MAP_WEAPON_KIND_TO_ICON[weapon.kind];

								return (
									<div
										key={weapon.kind}
										className='flex items-center justify-between bg-muted/30 border border-border px-4 py-3 rounded-xl hover:border-ring transition-colors'>
										<div className='flex items-center gap-3'>
											<div className='p-2 bg-background rounded-lg border border-border'>
												{iconName && (
													<GameIcon
														name={iconName}
														size={28}
														className='text-primary'
													/>
												)}
											</div>
											<div>
												<p className='font-semibold text-card-foreground'>
													{tWiki(`weapons.${iconName}.name`)}
												</p>
												<p className='text-xs text-muted-foreground'>
													{tWiki(`weapons.${iconName}.type`)}
												</p>
											</div>
										</div>

										<div className='flex items-center gap-6 text-sm'>
											<div className='text-right'>
												<p className='text-xs text-muted-foreground'>
													{t('labels.timesUsed')}
												</p>
												<p className='font-medium text-card-foreground'>
													{weapon.timesUsed}x
												</p>
											</div>
											<div className='text-right'>
												<p className='text-xs text-muted-foreground'>
													{t('labels.highestLevel')}
												</p>
												<p className='font-bold text-primary'>
													{t('labels.levelFormat', {
														level: weapon.highestLevel,
													})}
												</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
