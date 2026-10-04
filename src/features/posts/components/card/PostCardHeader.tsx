'use client';

import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/features/auth/stores/session';
import { ROUTES } from '@/modules/i18n/constants/routes';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { useDeletePost } from '../../hook/useDeletePost';
import { Post } from '../../types/post';
import { PostCardAuthorHeader } from './PostCardAuthorHeader';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';

interface PostCardHeaderProps {
	post: Post;
	isDetailView?: boolean;
}

export default function PostCardHeader({ post, isDetailView }: PostCardHeaderProps) {
	const t = useTranslations('posts.actions');
	const user = useUser();
	const deletePost = useDeletePost();
	const router = useRouter();
	const isOwner = user?.id === post.author.id;

	const handleDelete = () => {
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
	};

	return (
		<div className='flex items-center gap-1 text-sm'>
			<PostCardAuthorHeader author={post.author} createdAt={post.createdAt} />

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
						<ActionConfirmDialog
							title={t('delete_title')}
							description={t('delete_description')}
							confirmText={t('delete')}
							isPending={deletePost.isPending}
							isDestructive
							onConfirm={() => handleDelete()}
							trigger={
								<DropdownMenuItem
									variant='destructive'
									onSelect={(e) => e.preventDefault()}
									className='cursor-pointer'>
									<Trash2 />
									{t('delete')}
								</DropdownMenuItem>
							}
						/>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
}
