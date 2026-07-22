'use client';

import { useState } from 'react';
import LikeButton from '@/features/likes/components/LikeButton';
import { Post } from '../types/post';
import DisplayDate from '@/components/ui/date';
import { MessageCircle } from 'lucide-react';
import { Repeat2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CreatePost from './create-post';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAddRepost, useDeleteRepost } from '@/features/reposts/hook/useReposts';

interface PostFooterProps {
	post: Post;
}

export default function PostFooter({ post }: PostFooterProps) {
	const [reposted, setReposted] = useState(post.isReposted);
	const [repostCount, setRepostCount] = useState(post.repostCount);
	const [quoteOpen, setQuoteOpen] = useState(false);
	const addRepost = useAddRepost();
	const deleteRepost = useDeleteRepost();

	const isMutating = addRepost.isPending || deleteRepost.isPending;

	const handleRepostClick = () => {
		if (isMutating) return;
		if (reposted) {
			deleteRepost.mutate(post.id);
			setReposted(false);
			setRepostCount((c) => c - 1);
		} else {
			addRepost.mutate(post.id);
			setReposted(true);
			setRepostCount((c) => c + 1);
		}
	};

	return (
		<div className='flex items-center justify-between px-0 gap-2 pl-1 w-full'>
			<div className='flex items-center gap-2 z-10'>
				<div className='flex items-center gap-1 z-0'>
					<div className='p-2'>
						<MessageCircle className='size-4' />
					</div>
					{post.commentCount > 0 && <span>{post.commentCount}</span>}
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='px-0'>
							<Repeat2
								className={`size-4 ${reposted ? 'text-primary' : ''}`}
							/>
							{repostCount > 0 && <span>{repostCount}</span>}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={handleRepostClick}>
							{reposted ? 'Undo repost' : 'Repost'}
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setQuoteOpen(true)}>
							Quote
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
					<DialogContent>
						<CreatePost
							quotedPostId={post.id}
							onSuccess={() => setQuoteOpen(false)}
						/>
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
