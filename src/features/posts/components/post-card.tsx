'use client';

import { Post } from '../types/post';
import { ImageModal } from '@/components/ui/image-modal';

import PostHeader from './post-header';
import PostFooter from './post-footer';

interface PostCardProps {
	post: Post;
}

export default function PostCard({ post }: PostCardProps) {
	return (
		<>
			<PostHeader post={post} />

			<p className='pl-1'>{post.content}</p>
			{post.imageUrl && (
				<div className='pl-1 w-full' onClick={(e) => e.stopPropagation()}>
					<ImageModal
						src={post.imageUrl}
						alt=''
						thumbnailClassName='px-0 mt-2 w-full h-auto aspect-square rounded-2xl border border-border'
					/>
				</div>
			)}

			<PostFooter post={post} />
		</>
	);
}
