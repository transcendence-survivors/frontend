import { urlDecode } from '@/libs/urls';
import UserPosts from '@/features/posts/components/user-posts';

interface PostsPageProps {
	params: Promise<{ username: string }>;
}

export default async function PostsPage({ params }: PostsPageProps) {
	const { username } = await params;
	const decodedUsername = urlDecode(username).substring(1);

	return (
		<main className='flex-1'>
			<UserPosts username={decodedUsername} />;
		</main>
	);
}
