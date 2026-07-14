'use client';

import LikeButton from '@/features/likes/components/LikeButton';
import { Post } from '../types/post';
import DisplayDate from '@/components/ui/date';
import { MessageCircle } from 'lucide-react';

interface PostFooterProps {
	post: Post;
}

export default function PostFooter({ post }: PostFooterProps) {
	return (
		<div className='flex items-center justify-between px-0 gap-2 pl-1 w-full'>
			<div className='flex items-center gap-2 z-10'>
				<LikeButton
					postId={post.id}
					likeCount={post.likeCount}
					isLiked={post.isLiked}
				/>
				<div className='flex items-center gap-1 z-0'>
					<div className='p-2'>
						<MessageCircle className='size-4' />
					</div>
					{post.commentCount > 0 && <span>{post.commentCount}</span>}
				</div>
			</div>
			<DisplayDate
				date={new Date(post.createdAt)}
				className='text-sm text-muted-foreground'
			/>
		</div>
	);
}
