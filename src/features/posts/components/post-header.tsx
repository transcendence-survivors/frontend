'use client';

import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import DisplayDate from '@/components/ui/date';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/features/auth/stores/session';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { ROUTES } from '@/modules/i18n/constants/routes';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { useDeletePost } from '../hook/useDeletePost';
import { Post } from '../types/post';

interface PostHeaderProps {
	post: Post;
	isDetailView?: boolean;
}

export default function PostHeader({ post, isDetailView }: PostHeaderProps) {
	const t = useTranslations('posts.actions');
	const user = useUser();
	const deletePost = useDeletePost();
	const router = useRouter();
	const isOwner = user?.id === post.author.id;

	function handleDelete() {
		deletePost.mutate(post, {
			onSuccess: () => {
				if (!isDetailView) return;
				if (post.parentPostId && post.parent) {
					router.push(
						ROUTES.userNamePostsId({
							username: `@${post.parent.author.username}`,
							id: post.parentPostId,
						}),
					);
				} else {
					router.push(ROUTES.feed());
				}
			},
		});
	}

	return (
		<div className='flex items-center gap-1 text-sm'>
			<I18nLink
				href='userName'
				hrefParams={{ username: `@${post.author.username}` }}
				className='group relative z-10 flex min-w-0 items-center gap-1'>
				<span className='truncate font-semibold group-hover:underline'>
					{post.author.displayName}
				</span>
				<span className='truncate text-muted-foreground'>
					@{post.author.username}
				</span>
			</I18nLink>
			<span className='text-muted-foreground'>·</span>
			<DisplayDate
				date={new Date(post.createdAt)}
				className='shrink-0 text-muted-foreground'
			/>

			{isOwner && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							size='icon-sm'
							className='relative z-10 -my-1 ml-auto text-muted-foreground'>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem variant='destructive' onClick={handleDelete}>
							<Trash2 />
							{t('delete')}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
}
