'use client';

import { useState } from 'react';
import { MessageCircle, Repeat2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LikeButton from '@/features/likes/components/LikeButton';
import { useAddRepost, useDeleteRepost } from '@/features/reposts/hook/useReposts';
import { cn } from '@/libs/utils';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { Post } from '../types/post';
import CreatePost from './create-post';

interface PostFooterProps {
	post: Post;
}

export default function PostFooter({ post }: PostFooterProps) {
	const t = useTranslations('posts.actions');
	const [quoteOpen, setQuoteOpen] = useState(false);
	const addRepost = useAddRepost();
	const deleteRepost = useDeleteRepost();

	const isMutating = addRepost.isPending || deleteRepost.isPending;

	const handleRepostClick = () => {
		if (isMutating) return;
		if (post.isReposted) deleteRepost.mutate(post.id);
		else addRepost.mutate(post.id);
	};

	return (
		<div className='-ml-2 mt-1 flex items-center gap-6 text-muted-foreground'>
			<Button variant='ghost' size='sm' className='relative z-10' asChild>
				<I18nLink
					href='userNamePostsId'
					hrefParams={{ username: `@${post.author.username}`, id: post.id }}
					aria-label={t('comment')}>
					<MessageCircle />
					{post.commentCount > 0 && post.commentCount}
				</I18nLink>
			</Button>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						size='sm'
						aria-label={t('repost')}
						className={cn('relative z-10', post.isReposted && 'text-primary')}>
						<Repeat2 />
						{post.repostCount > 0 && post.repostCount}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={handleRepostClick}>
						{post.isReposted ? t('undo_repost') : t('repost')}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setQuoteOpen(true)}>
						{t('quote')}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<LikeButton
				postId={post.id}
				likeCount={post.likeCount}
				isLiked={post.isLiked}
			/>

			<Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
				<DialogContent>
					<CreatePost
						quotedPostId={post.id}
						onSuccess={() => setQuoteOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
