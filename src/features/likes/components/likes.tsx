import { Button } from '@/components/ui/button';
import { useAddLike, useDeleteLike, useLikeCount } from '../hook/useLikes';
import { Heart } from 'lucide-react';

interface likeButtonProps {
	postId: string;
}

export default function LikeButton({ postId }: likeButtonProps) {
	const { data } = useLikeCount(postId);
	const addLike = useAddLike();
	const deleteLike = useDeleteLike();

	const isMutating = addLike.isPending || deleteLike.isPending;

	function handleClick() {
		if (isMutating) return;
		if (data?.data.isLiked === true) deleteLike.mutate(postId);
		else addLike.mutate(postId);
	}

	return (
		<Button variant='ghost' disabled={isMutating} onClick={handleClick}>
			<Heart
				className={
					data?.data.isLiked ? 'fill-red-500 text-red-500' : 'text-foreground'
				}
			/>
			{data?.data.count}
		</Button>
	);
}
