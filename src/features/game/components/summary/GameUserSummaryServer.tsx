import GameUserSummary from '@/features/game/components/summary/GameUserSummary';
import { Card, CardContent } from '@/components/ui/card';
import { getSummary } from '../../api/summary';
import { isApiError } from '@/libs/api';
import { getTranslations } from 'next-intl/server';

interface GameUserSummaryServerProps {
	username: string;
}

export default async function GameUserSummaryServer({
	username,
}: GameUserSummaryServerProps) {
	const response = await getSummary(username);
	const t = await getTranslations('game.summary');

	if (isApiError(response)) {
		return (
			<Card className='border-destructive/50 bg-destructive/10 flex-1 flex flex-col items-center justify-center'>
				<CardContent className='p-6 text-center text-destructive  gap-2'>
					<p>{t('fetch_error')}</p>
				</CardContent>
			</Card>
		);
	}

	return <GameUserSummary summary={response.data} />;
}
