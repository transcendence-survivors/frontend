import { urlDecode } from '@/libs/urls';
import { notFound } from 'next/navigation';
import UserLikes from '@/features/posts/components/user-likes';

interface LikesPageProps {
	params: Promise<{ username: string }>;
}

export default async function LikesPage({ params }: LikesPageProps) {
	const { username } = await params;
	if (!urlDecode(username).startsWith('@')) {
		notFound();
	}
	const decodedUsername = urlDecode(username).substring(1);

	return <UserLikes username={decodedUsername} />;
}
