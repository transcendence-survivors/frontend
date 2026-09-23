import { cookies } from 'next/headers';
import { getPostById } from '@/features/posts/api/posts';
import CreatePost from '@/features/posts/components/create-post';
import PostDetail from '@/features/posts/components/post-detail';
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
		<main className='max-w-2xl mx-auto pb-8'>
			<PostDetailHeader />
			<PostDetail post={res.data} />
			<div className='px-4 border-y border-border'>
				<CreatePost parentPostId={postId} />
			</div>
			<Posts parentPostId={postId} />
		</main>
	);
}
