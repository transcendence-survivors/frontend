import { Post } from '../types/post';
import LikeButton from '@/features/likes/components/LikeButton';
import { ImageModal } from '@/components/ui/image-modal';
import DisplayDate from '@/components/ui/date';
import { UserIdentityLink } from '@/features/user/components/Identity/UserIdentity';
import { useUser } from '@/features/auth/stores/session';
import { useDeletePost } from '../hook/useDeletePost';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostCardProps {
	post: Post;
}

export default function PostCard({ post }: PostCardProps) {
	const user = useUser();
	const isOwner = user?.id === post.author.id;
	const deletePost = useDeletePost();

	return (
		<>
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
			<p className='pl-1'>{post.content}</p>
			{post.imageUrl && (
				<div className='pl-1 w-full'>
					<ImageModal
						src={post.imageUrl}
						alt=''
						thumbnailClassName='px-0 mt-2 w-full h-auto aspect-square rounded-2xl border border-border'
					/>
				</div>
			)}
			<div className='flex items-center justify-between px-0 gap-2 pl-1 w-full'>
				<div className='flex items-center gap-2'>
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
		</>
	);
}
