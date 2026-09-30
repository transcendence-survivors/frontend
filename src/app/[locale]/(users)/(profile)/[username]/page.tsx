import { Spinner } from '@/components/ui/spinner';
import UserSummaryServer from '@/features/game/components/UserSummaryServer';
import { urlDecode } from '@/libs/urls';
import { Suspense } from 'react';

interface ProfilePageProps {
	params: {
		username: string;
	};
}

export default async function ProfilePage({ params }: ProfilePageProps) {
	const { username } = await params;
	const cleanUsername = urlDecode(username).substring(1);
	return (
		<main>
			<Suspense fallback={<Spinner className='mx-auto mt-12 size-8' />}>
				<UserSummaryServer username={cleanUsername} />
			</Suspense>
		</main>
	);
}
