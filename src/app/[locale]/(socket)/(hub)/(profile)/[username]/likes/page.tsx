import { urlDecode } from '@/libs/urls';
import UserLikes from '@/features/posts/components/user/UserLikes';

interface LikesPageProps {
	params: Promise<{ username: string }>;
}

export default async function LikesPage({ params }: LikesPageProps) {
	const { username } = await params;
	const decodedUsername = urlDecode(username).substring(1);

	return (
		<main className='flex-1'>
			<UserLikes username={decodedUsername} />
		</main>
	);
}
