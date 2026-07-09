import { Post } from '../types/post';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import LikeButton from '@/features/likes/components/LikeButton';
import { ImageModal } from '@/components/ui/image-modal';

interface PostCardProps {
	post: Post;
}

export default function PostCard({ post }: PostCardProps) {
	return (
		<li
			key={post.id}
			className='flex gap-3 p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer'>
			<Avatar>
				<AvatarImage src={post.author.avatarUrl} />
				<AvatarFallback>{post.author.displayName.charAt(0)}</AvatarFallback>
			</Avatar>
			<div className='flex-1 min-w-0'>
				<div className='flex gap-2'>
					<span className='font-semibold'>
						{' '}
						{post.author?.displayName ?? post.author.id}
					</span>
					<span className='text-sm text-muted-foreground'>
						{new Date(post.createdAt).toLocaleString('fr-FR', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})}
					</span>
				</div>
				<p>{post.content}</p>
				{post.imageUrl && (
					<ImageModal
						src={post.imageUrl}
						alt=''
						thumbnailClassName='mt-2 w-full h-auto aspect-square rounded-2xl border border-border'
					/>
				)}
				<LikeButton
					postId={post.id}
					likeCount={post.likeCount}
					isLiked={post.isLiked}
				/>
			</div>
		</li>
	);
}
