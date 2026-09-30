'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LeaderboardPreview } from '../../types/leaderboard';
import { memo } from 'react';
import { formatDuration } from '../../utils/duration';
import { AvatarProfile } from '@/features/user/components/Avatar/AvatarProfile';
import UserDisplayUsername from '@/features/user/components/Identity/UserDisplayUsername';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { cn } from '@/libs/utils';
import { StatMetric } from '../StatMetric';
import GameRankBadge from './GameRankBadge';

interface Props {
	item: LeaderboardPreview;
	rank: number;
}

export const GameLeaderboardCard = memo(({ item, rank }: Props) => {
	const t = useTranslations('game');
	console.log(item);
	const displayName = item.user?.displayName || t('playerFallback', { index: rank });

	const username = item.user?.username;

	const cardContent = (
		<Card
			className={cn(
				'p-4 bg-card/60 border-border shadow-sm transition-all duration-200 rounded-xl grid grid-cols-12 items-center gap-4',
				username && 'hover:bg-accent/40 group-hover/card:border-ring/50',
				rank === 1 && 'border-chart-1/30 bg-chart-1/[0.02]',
				rank === 2 && 'border-chart-2/30 bg-chart-2/[0.02]',
				rank === 3 && 'border-chart-3/30 bg-chart-3/[0.02]',
			)}>
			<div className='col-span-12  lg:col-span-4 flex items-center gap-3.5 min-w-0'>
				<GameRankBadge rank={rank} />

				{item.user ? (
					<>
						<AvatarProfile
							img={{
								src: item.user.avatarUrl ?? 'placeholder.png',
								alt: displayName,
							}}
							size='md'
							className={cn(
								username &&
									'transition-transform duration-200 group-hover/card:scale-105 group-hover/card:ring-2 group-hover/card:ring-primary/50 group-hover/card:ring-offset-2 group-hover/card:ring-offset-background',
							)}
						/>

						<div className='min-w-0 flex-1 truncate'>
							<UserDisplayUsername
								username={item.user.username}
								displayName={displayName}
								className={cn(username && 'group-hover/card:underline')}
							/>
						</div>
					</>
				) : (
					<div className='flex items-center gap-3 min-w-0'>
						<div className='size-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0'>
							?
						</div>
						<span className='text-sm font-semibold text-muted-foreground truncate'>
							{t('playerFallback', { index: rank })}
						</span>
					</div>
				)}
			</div>

			<div className='col-span-12 lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-2 text-right'>
				<StatMetric
					label={t('summary.totalKills')}
					value={item.totalKills.toLocaleString()}
					variant='destructive'
					size='xs'
				/>
				<StatMetric
					label={t('summary.highestSurvivalTime')}
					value={formatDuration(item.highestSurvivalTime)}
					variant='chart-2'
					size='xs'
				/>
				<StatMetric
					label={t('summary.highestKills')}
					value={item.highestKills.toLocaleString()}
					variant='chart-3'
					size='xs'
				/>
				<StatMetric
					label={t('summary.gamesPlayed')}
					value={item.totalGamesPlayed.toLocaleString()}
					variant='default'
					size='xs'
				/>
			</div>
		</Card>
	);

	if (!username) return cardContent;

	return (
		<I18nLink
			href='userName'
			hrefParams={{ username: `@${username}` }}
			className='block group/card outline-none rounded-xl'>
			{cardContent}
		</I18nLink>
	);
});

GameLeaderboardCard.displayName = 'GameLeaderboardCard';

export const GameLeaderboardCardSkeleton = () => {
	return (
		<Card className='p-4 bg-card/60 border-border shadow-sm rounded-xl grid grid-cols-12 items-center gap-4'>
			<div className='col-span-12 sm:col-span-6 md:col-span-5 flex items-center gap-3.5 min-w-0'>
				<Skeleton className='size-9 rounded-xl shrink-0' />
				<Skeleton className='size-10 rounded-full shrink-0' />
				<div className='flex flex-col gap-1.5 flex-1 min-w-0'>
					<Skeleton className='h-4 w-28' />
					<Skeleton className='h-3 w-20' />
				</div>
			</div>

			<div className='col-span-12 sm:col-span-6 md:col-span-7 grid grid-cols-3 gap-2 text-right'>
				<div className='space-y-1 flex flex-col items-end'>
					<Skeleton className='h-3 w-16' />
					<Skeleton className='h-5 w-10' />
				</div>
				<div className='space-y-1 flex flex-col items-end'>
					<Skeleton className='h-3 w-20' />
					<Skeleton className='h-4 w-14' />
				</div>
				<div className='space-y-1 flex flex-col items-end'>
					<Skeleton className='h-3 w-16' />
					<Skeleton className='h-4 w-8' />
				</div>
			</div>
		</Card>
	);
};
