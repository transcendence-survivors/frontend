import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Kicker from '@/components/ui/kicker';
import GameHistory from '@/features/game/components/history/GameHistory';
import GameHistoryFilters from '@/features/game/components/history/GameHistoryFilters';
import PlayButton from '@/features/game/components/PlayButton';
import { urlDecode } from '@/libs/urls';
import { getTranslations } from 'next-intl/server';

interface ProfilePageProps {
	params: {
		username: string;
	};
}

export default async function Page({ params }: ProfilePageProps) {
	const { username } = await params;
	const t = await getTranslations('game');
	const cleanUsername = urlDecode(username).substring(1);

	return (
		<main className='flex-1 flex flex-col'>
			<header className='px-10 py-8 border-b border-border'>
				<section className='flex items-center justify-between mx-auto'>
					<div className='space-y-2'>
						<h2 className='text-3xl font-bold tracking-tight text-foreground'>
							{t('title')}
						</h2>
						<Kicker className='text-xs'>
							{t('subtitle_username', { username: cleanUsername })}
						</Kicker>
					</div>
					<div className='flex gap-2'>
						<PlayButton />
						<GameHistoryFilters />
					</div>
				</section>
			</header>

			<section className='flex flex-col flex-1 px-10 py-6 space-y-6'>
				<GameHistory username={cleanUsername} />
			</section>
		</main>
	);
}
