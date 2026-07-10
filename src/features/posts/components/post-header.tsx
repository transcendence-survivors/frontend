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

interface PostHeaderProps {
	post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
	const user = useUser();
	const isOwner = user?.id === post.author.id;
	const deletePost = useDeletePost();

	return (
		<div className='flex items-start justify-between w-full gap-3'>
			<UserIdentityLink
				className='pl-1'
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
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost'>
						<MoreHorizontal />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{isOwner && (
						<DropdownMenuItem
							variant='destructive'
							onClick={() => deletePost.mutate(post.id)}>
							<Trash2 />
							Delete
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
