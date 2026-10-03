import { getTranslations } from 'next-intl/server';
import Kicker from '@/components/ui/kicker';
import PlayButton from '@/features/game/components/PlayButton';
import GameLeaderboard from '@/features/game/components/leaderboard/GameLeaderboard';

export default async function Page() {
	const t = await getTranslations('game');

	return (
		<main className='h-main flex flex-col'>
			<header className='px-10 py-8 border-b border-border'>
				<section className='flex items-center justify-between mx-auto'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold tracking-tight text-foreground'>
							{t('leaderboard.title')}
						</h1>
						<Kicker className='text-xs'>{t('leaderboard.subtitle')}</Kicker>
					</div>
					<PlayButton />
				</section>
			</header>

			<section className='flex flex-col flex-1 px-10 py-6'>
				<GameLeaderboard />
			</section>
		</main>
	);
}
