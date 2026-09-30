'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DisplayDate from '@/components/ui/date';
import { GameHistoryPreview } from '../../types/game';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { AvatarProfileTooltip } from '@/features/user/components/Avatar/AvatarProfile';
import { formatDuration } from '../../utils/duration';
import { Skeleton } from '@/components/ui/skeleton';
import { memo } from 'react';

interface Props {
	game: GameHistoryPreview;
}

export const GameHistoryCard = memo(({ game }: Props) => {
	const t = useTranslations('game');
	return (
		<article>
			<Card
				className='group relative p-4 transition-colors duration-200 bg-card/60 border-border
            shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4
            hover:bg-muted hover:border-ring focus-within:bg-muted focus-within:border-ring'>
				<I18nLink
					href='gameDetails'
					hrefParams={{ id: game.id }}
					className='absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-5 focus-visible:ring-ring focus-visible:ring-offset-background'
					aria-label={t('title')}
				/>

				<div className='space-y-1.5 min-w-0 z-0'>
					<div className='flex items-center gap-2'>
						<h3 className='font-bold text-sm text-foreground group-hover:underline truncate'>
							{t('gameIdTitle', { gameId: game.id })}
						</h3>
						<Badge
							variant='outline'
							className='text-xs font-semibold shrink-0'>
							{formatDuration(game.survivalTime)}
						</Badge>
					</div>
					<p className='text-xs text-muted-foreground'>
						<DisplayDate
							date={game.createdAt}
							formatOptions={{
								month: 'short',
								day: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
								year: 'numeric',
							}}
						/>
					</p>
				</div>

				<div className='flex items-center justify-between sm:justify-end gap-6 shrink-0 z-20 pointer-events-none'>
					<div className='flex -space-x-2 overflow-hidden items-center pointer-events-auto'>
						{game.players.map((player) => (
							<div
								key={player.id}
								className='ring-2 ring-background rounded-full'>
								<AvatarProfileTooltip
									user={player.user}
									size='md'
									isLink={!!player.user}
								/>
							</div>
						))}
					</div>

					<div className='text-right min-w-[80px]'>
						<p className='text-[11px] font-semibold uppercase text-muted-foreground'>
							{t('labels.matchKills')}
						</p>
						<p className='text-lg font-black text-destructive'>
							{game.totalKills.toLocaleString()}
						</p>
					</div>
				</div>
			</Card>
		</article>
	);
});

GameHistoryCard.displayName = 'GameHistoryCard';

export const GameHistoryCardSkeleton = () => {
	return (
		<Card className='p-4 bg-card/60 border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
			<div className='space-y-2 min-w-0'>
				<div className='flex items-center gap-2'>
					<Skeleton className='h-4 w-32' />
					<Skeleton className='h-5 w-16 rounded-full' />
				</div>
				<Skeleton className='h-3 w-24' />
			</div>
			<div className='flex items-center justify-between sm:justify-end gap-6 shrink-0'>
				<div className='flex -space-x-2 overflow-hidden items-center'>
					<Skeleton className='size-8 rounded-full ring-2 ring-background' />
					<Skeleton className='size-8 rounded-full ring-2 ring-background' />
				</div>
				<div className='space-y-1 text-right min-w-[80px]'>
					<Skeleton className='h-3 w-16 ml-auto' />
					<Skeleton className='h-6 w-10 ml-auto' />
				</div>
			</div>
		</Card>
	);
};
