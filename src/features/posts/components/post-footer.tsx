import LikeButton from '@/features/likes/components/LikeButton';
import { Post } from '../types/post';
import DisplayDate from '@/components/ui/date';

interface PostFooterProps {
	post: Post;
}

export default function PostFooter({ post }: PostFooterProps) {
	return (
		<div
			className='flex items-center justify-between px-0 gap-2 pl-1 w-full'
			onClick={(e) => e.stopPropagation()}>
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
	);
}
