import UserReposts from '@/features/posts/components/user-reposts';
import { urlDecode } from '@/libs/urls';

interface RepostsPageProps {
	params: Promise<{ username: string }>;
}

export default async function RepostsPage({ params }: RepostsPageProps) {
	const { username } = await params;
	const decodedUsername = urlDecode(username).substring(1);

	return (
		<main className='flex-1'>
			<UserReposts username={decodedUsername} />
		</main>
	);
}
