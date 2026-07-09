import { Post } from '../types/post';
import LikeButton from '@/features/likes/components/LikeButton';
import { ImageModal } from '@/components/ui/image-modal';
import DisplayDate from '@/components/ui/date';
import { UserIdentityLink } from '@/features/user/components/Identity/UserIdentity';

interface PostCardProps {
	post: Post;
}

export default function PostCard({ post }: PostCardProps) {
	return (
		<li className='flex flex-col items-start gap-2 p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer'>
			<div className='flex items-center gap-3'>
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
				<DisplayDate
					date={new Date(post.createdAt)}
					className='text-sm text-muted-foreground'
				/>
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
			<div className='flex items-center px-0 gap-2 pl-1'>
				<LikeButton
					postId={post.id}
					likeCount={post.likeCount}
					isLiked={post.isLiked}
				/>
			</div>
		</li>
	);
}
