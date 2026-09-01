import { cookies } from 'next/headers';
import { getPostById } from '@/features/posts/api/posts';
import CreatePost from '@/features/posts/components/create-post';
import PostCard from '@/features/posts/components/post-card';
import PostDetailHeader from '@/features/posts/components/post-page-header';
import Posts from '@/features/posts/components/posts';
import { isApiError } from '@/libs/api';
import { notFound } from 'next/navigation';

interface PostPageProps {
	params: Promise<{ postId: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
	const [{ postId }, cookieStore] = await Promise.all([params, cookies()]);
	const res = await getPostById(postId, cookieStore.toString());
	if (isApiError(res)) notFound();

	return (
		<main className='max-w-xl mx-auto px-4 py-8'>
			<PostDetailHeader />
			<PostCard post={res.data} isDetailView={true} />
			<CreatePost parentPostId={postId} />
			<Posts parentPostId={postId} />
		</main>
	);
}
