import { urlDecode } from '@/libs/urls';
import { notFound } from 'next/navigation';
import UserPosts from '@/features/posts/components/user-posts';

interface PostsPageProps {
	params: Promise<{ username: string }>;
}

export default async function PostsPage({ params }: PostsPageProps) {
	const { username } = await params;
	if (!urlDecode(username).startsWith('@')) {
		notFound();
	}
	const decodedUsername = urlDecode(username).substring(1);

	return <UserPosts username={decodedUsername} />;
}
