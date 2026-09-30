import { getTranslations } from 'next-intl/server';
import Kicker from '@/components/ui/kicker';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { Button } from '@/components/ui/button';
import GameHistoryFilters from '@/features/game/components/history/GameHistoryFilters';
import GameHistory from '@/features/game/components/history/GameHistory';
import { Play } from 'lucide-react';
import PlayButton from '@/features/game/components/PlayButton';

export default async function Page() {
	const t = await getTranslations('game');

	return (
		<main className='h-main flex flex-col'>
			<header className='px-10 py-8 border-b border-border'>
				<section className='flex items-center justify-between mx-auto'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold tracking-tight text-foreground'>
							{t('global.title')}
						</h1>
						<Kicker className='text-xs'>{t('global.subtitle')}</Kicker>
					</div>
					<div className='flex gap-2'>
						<PlayButton />
						<GameHistoryFilters />
					</div>
				</section>
			</header>

			<section className='flex flex-col flex-1 px-10 py-6'>
				<GameHistory />
			</section>
		</main>
	);
}
