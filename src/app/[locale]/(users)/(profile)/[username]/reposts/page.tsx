import UserReposts from '@/features/posts/components/user-reposts';
import { urlDecode } from '@/libs/urls';
import { notFound } from 'next/navigation';

interface RepostsPageProps {
	params: Promise<{ username: string }>;
}

export default async function RepostsPage({ params }: RepostsPageProps) {
	const { username } = await params;
	if (!urlDecode(username).startsWith('@')) {
		notFound();
	}
	const decodedUsername = urlDecode(username).substring(1);

	return <UserReposts username={decodedUsername} />;
}
