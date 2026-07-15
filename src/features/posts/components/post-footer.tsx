'use client';

import LikeButton from '@/features/likes/components/LikeButton';
import { Post } from '../types/post';
import DisplayDate from '@/components/ui/date';
import { MessageCircle } from 'lucide-react';
import { Repeat2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CreatePost from './create-post';

interface PostFooterProps {
	post: Post;
}

export default function PostFooter({ post }: PostFooterProps) {
	return (
		<div className='flex items-center justify-between px-0 gap-2 pl-1 w-full'>
			<div className='flex items-center gap-2 z-10'>
				<div className='flex items-center gap-1 z-0'>
					<div className='p-2'>
						<MessageCircle className='size-4' />
					</div>
					{post.commentCount > 0 && <span>{post.commentCount}</span>}
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='ghost' className='px-0'>
							<Repeat2 className='size-4' />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<CreatePost quotedPostId={post.id} />
					</DialogContent>
				</Dialog>
				<LikeButton
					postId={post.id}
					likeCount={post.likeCount}
					isLiked={post.isLiked}
				/>
			</div>
			<DisplayDate
				date={new Date(post.createdAt)}
				className='text-sm text-muted-foreground'
			/>
		</div>
	);
}
