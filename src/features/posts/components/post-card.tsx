import { Post } from '../types/post';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import LikeButton from '@/features/likes/components/LikeButton';
import { ImageModal } from '@/components/ui/image-modal';
import DisplayDate from '@/components/ui/date';

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
					<DisplayDate
						date={new Date(post.createdAt)}
						className='text-sm text-muted-foreground'
					/>
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
