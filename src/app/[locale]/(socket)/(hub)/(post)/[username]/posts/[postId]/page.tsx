import { cookies } from 'next/headers';
import { getPostById } from '@/features/posts/api/posts';
import PostPageHeader from '@/features/posts/components/PostPageHeader';
import Posts from '@/features/posts/components/Posts';
import { isApiError } from '@/libs/api';
import { notFound } from 'next/navigation';
import { ProfileRelationshipProvider } from '@/features/relationships/components/ProfileRelationShipProvider';
import PostCard from '@/features/posts/components/card/PostCard';
import { urlDecode } from '@/libs/urls';
import CreateComment from '@/features/posts/components/CreateComment';

interface PostPageProps {
	params: Promise<{ postId: string; username: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
	const [{ postId, username }, cookieStore] = await Promise.all([params, cookies()]);
	const decodedUsername = urlDecode(username);
	if (!decodedUsername.startsWith('@')) {
		notFound();
	}
	const cleanUsername = decodedUsername.substring(1);

	const res = await getPostById(postId, cookieStore.toString());
	if (isApiError(res) || res.data.author.username !== cleanUsername) notFound();

	return (
		<ProfileRelationshipProvider>
			<main className='max-w-2xl mx-auto pb-8'>
				<PostPageHeader />
				<PostCard post={res.data} isDetailView={true} />
				<div className='px-4 border-y border-border'>
					<CreateComment parentPostId={postId} />
				</div>
				<Posts parentPostId={postId} />
			</main>
		</ProfileRelationshipProvider>
	);
}
