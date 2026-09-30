'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { Spinner } from '@/components/ui/spinner';
import { Error } from '@/components/ui/error';
import { LoadingList } from '@/components/ui/loading-list';
import { GameLeaderboardTabs } from './GameLeaderboardTabs';
import { LeaderboardOrderBy } from '../../types/leaderboard';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { GameLeaderboardCard, GameLeaderboardCardSkeleton } from './GameLeaderboardCard';

const GameLeaderboard = () => {
	const [orderBy, setOrderBy] = useQueryState<LeaderboardOrderBy>('orderBy', {
		parse: (value) => value as LeaderboardOrderBy,
		defaultValue: 'highest-kills-desc',
	});
	const t = useTranslations('game.leaderboard');
	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '0px 0px 100px 0px',
	});

	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useLeaderboard({ orderBy });

	useEffect(() => {
		if (!inView) return;
		if (!hasNextPage) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const leaderboardItems = data?.pages.flatMap((page) => page.data) ?? [];

	return (
		<div className='flex flex-col gap-4'>
			<GameLeaderboardTabs orderBy={orderBy} setOrderBy={setOrderBy} />

			{isLoading ? (
				<LoadingList
					numberOfSkeletons={5}
					SkeletonComponent={GameLeaderboardCardSkeleton}
				/>
			) : isError || !data ? (
				<Error>{t('fetch_error')}</Error>
			) : leaderboardItems.length === 0 ? (
				<Error className='text-muted-foreground'>{t('no_leaderboard')}</Error>
			) : (
				<ul className='flex flex-col gap-2.5'>
					{leaderboardItems.map((item, index) => (
						<li key={item.id}>
							<GameLeaderboardCard item={item} rank={index + 1} />
						</li>
					))}
				</ul>
			)}

			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-4'>
					{isFetchingNextPage && <Spinner className='size-6' />}
				</div>
			)}

			{!hasNextPage && leaderboardItems.length > 0 && (
				<div className='flex justify-center py-4 text-muted-foreground text-sm'>
					{t('no_more_leaderboard')}
				</div>
			)}
		</div>
	);
};

export default GameLeaderboard;
