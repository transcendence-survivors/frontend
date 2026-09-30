import { UserGameSummaryCard } from '@/features/game/components/UserGameSummaryCard';
import { Card, CardContent } from '@/components/ui/card';
import { getUserGameSummary } from '../api/summary';
import { isApiError } from '@/libs/api';
import { getTranslations } from 'next-intl/server';

interface UserSummaryServerProps {
	username: string;
}

export default async function UserSummaryServer({ username }: UserSummaryServerProps) {
	const response = await getUserGameSummary(username);
	const t = await getTranslations('userSummary');

	if (isApiError(response)) {
		return (
			<Card className='max-w-2xl border-destructive/50 bg-destructive/10'>
				<CardContent className='p-6 text-center text-destructive'>
					<p>{t('fetch_error')}</p>
				</CardContent>
			</Card>
		);
	}

	return <UserGameSummaryCard summary={response.data} />;
}
