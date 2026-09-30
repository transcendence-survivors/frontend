'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { Spinner } from '@/components/ui/spinner';
import { Error } from '@/components/ui/error';
import { LoadingList } from '@/components/ui/loading-list';
import { GameHistoryCard, GameHistoryCardSkeleton } from './GameHistoryCard';
import { useHistory, UseHistoryParams } from '../../hooks/useHistory';
import { GamesHistoryOrderBy } from '../../types/game';
import { useQueryState } from 'nuqs';

interface GameStatsDataProps extends React.HTMLAttributes<HTMLDivElement> {
	username?: UseHistoryParams['username'];
}

const GameHistory = ({ username }: GameStatsDataProps) => {
	const [orderBy] = useQueryState<GamesHistoryOrderBy>('orderBy', {
		parse: (value) => value as GamesHistoryOrderBy,
		defaultValue: 'created-desc',
	});
	const t = useTranslations('game');
	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useHistory({ username, orderBy });

	useEffect(() => {
		if (!inView) return;
		if (!hasNextPage) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) {
		return (
			<LoadingList
				numberOfSkeletons={5}
				SkeletonComponent={GameHistoryCardSkeleton}
			/>
		);
	}
	if (isError || !data) {
		return <Error>{t('fetch_error')}</Error>;
	}

	const games = data.pages.flatMap((page) => page.data);

	return (
		<>
			{games.length === 0 ? (
				<Error className='text-muted-foreground'>
					{!username ? t('no_games') : t('no_user_games')}
				</Error>
			) : (
				<ul className='flex flex-col gap-2.5'>
					{games.map((game) => (
						<li key={game.id}>
							<GameHistoryCard game={game} />
						</li>
					))}
				</ul>
			)}
			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-4'>
					{isFetchingNextPage && <Spinner className='size-6' />}
				</div>
			)}
			{!hasNextPage && games.length > 0 && (
				<div className='flex justify-center py-4 text-muted-foreground text-sm'>
					{t('no_more_games')}
				</div>
			)}
		</>
	);
};

export default GameHistory;
