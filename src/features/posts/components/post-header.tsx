'use client';

import { UserIdentityLink } from '@/features/user/components/Identity/UserIdentity';
import { Post } from '../types/post';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useUser } from '@/features/auth/stores/session';
import { useDeletePost } from '../hook/useDeletePost';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { resolveHref } from '@/modules/i18n/components/I18nLink';
import { getPath } from '@/modules/i18n/utils/routing';

interface PostHeaderProps {
	post: Post;
	isDetailView?: boolean;
}

export default function PostHeader({ post, isDetailView }: PostHeaderProps) {
	const user = useUser();
	const isOwner = user?.id === post.author.id;
	const deletePost = useDeletePost();
	const router = useRouter();

	return (
		<div className='flex items-start justify-between w-full gap-3'>
			<UserIdentityLink
				className='pl-1 z-10'
				avatar={{
					img: {
						src: post.author.avatarUrl ?? '',
						alt: post.author.displayName,
					},
				}}
				user={{
					displayName: post.author.displayName,
					username: post.author.username,
				}}
			/>
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='z-10'>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{isOwner && (
							<DropdownMenuItem
								variant='destructive'
								onClick={() =>
									deletePost.mutate(post.id, {
										onSuccess: () => {
											if (!isDetailView) return;
											if (post.parentPostId && post.parent) {
												router.push(
													resolveHref(
														getPath('userNamePostsId'),
														{
															username: `@${post.parent.author.username}`,
															id: post.parentPostId,
														},
													),
												);
											} else {
												router.push(getPath('feed'));
											}
										},
									})
								}>
								<Trash2 />
								Delete
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
