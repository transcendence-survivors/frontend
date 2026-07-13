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
	const { postId } = await params;
	const res = await getPostById(postId);
	if (isApiError(res)) notFound();

	return (
		<>
			<PostDetailHeader />
			<article className='max-w-xl mx-auto flex flex-col items-start gap-2 p-4 border-b'>
				<PostCard post={res.data} isDetailView={true} />
			</article>
			<div className='max-w-xl mx-auto'>
				<CreatePost parentPostId={postId} />
			</div>
			<Posts parentPostId={postId} />
		</>
	);
}
