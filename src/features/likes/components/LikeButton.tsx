import { Button } from '@/components/ui/button';
import { useAddLike, useDeleteLike } from '../hook/useLikes';
import { Heart } from 'lucide-react';

interface likeButtonProps {
	postId: string;
	likeCount: number;
	isLiked: boolean;
}

export default function LikeButton({ postId, likeCount, isLiked }: likeButtonProps) {
	const addLike = useAddLike();
	const deleteLike = useDeleteLike();

	const isMutating = addLike.isPending || deleteLike.isPending;

	function handleClick() {
		if (isMutating) return;
		if (isLiked) deleteLike.mutate(postId);
		else addLike.mutate(postId);
	}

	return (
		<>
			<Button
				className='px-0'
				variant='ghost'
				disabled={isMutating}
				onClick={handleClick}>
				<Heart
					className={isLiked ? 'fill-red-500 text-red-500' : 'text-foreground'}
				/>
			</Button>
			<span>{likeCount}</span>
		</>
	);
}
