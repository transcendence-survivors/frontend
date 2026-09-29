import { urlDecode } from '@/libs/urls';
import { notFound } from 'next/navigation';
import UserComments from '@/features/posts/components/user-comments';

interface CommentsPageProps {
	params: Promise<{ username: string }>;
}

export default async function CommentsPage({ params }: CommentsPageProps) {
	const { username } = await params;
	if (!urlDecode(username).startsWith('@')) {
		notFound();
	}
	const decodedUsername = urlDecode(username).substring(1);

	return <UserComments username={decodedUsername} />;
}
