import { notFound } from 'next/navigation';
import { getGame } from '@/features/game/api/game';
import GameStats from '@/features/game/components/details/GameStats';
import { isApiError } from '@/libs/api';
import Kicker from '@/components/ui/kicker';
import { getTranslations } from 'next-intl/server';
import DisplayDate from '@/components/ui/date';
import { Badge } from '@/components/ui/badge';
import PlayButton from '@/features/game/components/PlayButton';

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export default async function GameDetailsPage({ params }: Props) {
	const { id } = await params;
	const res = await getGame(id);
	const t = await getTranslations('game');

	if (isApiError(res)) notFound();

	const game = res.data;
	return (
		<main className='h-main flex flex-col'>
			<header className='px-10 py-8 border-b border-border'>
				<section className='flex items-center justify-between mx-auto'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold tracking-tight text-foreground'>
							{t('global.title')}
						</h1>
						<div className='flex items-center gap-4'>
							<Kicker className='text-xs'>
								<DisplayDate
									date={game.createdAt}
									formatOptions={{
										month: 'short',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									}}
								/>
							</Kicker>
							<Badge
								variant='outline'
								className='text-xs border-border text-foreground font-semibold'>
								{t('playerCount', { count: game.players.length })}
							</Badge>
						</div>
					</div>
					<div className='flex gap-2'>
						<PlayButton />
					</div>
				</section>
			</header>

			<section className='flex flex-col flex-1 px-10 py-6 space-y-6'>
				<GameStats game={game} />
			</section>
		</main>
	);
}
