'use client';

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

	const handleClick = () => {
		if (isMutating) return;
		if (isLiked) deleteLike.mutate(postId);
		else addLike.mutate(postId);
	};

	return (
		<div className='flex items-center gap-0.5'>
			<Button
				variant='ghost'
				size='icon'
				className='p-2 rounded-full'
				// disabled={isMutating}
				aria-disabled={isMutating}
				onClick={handleClick}>
				<Heart
					className={`size-4 ${isLiked ? 'text-primary fill-primary' : ''}`}
				/>
			</Button>
			{likeCount > 0 && <span>{likeCount}</span>}
		</div>
	);
}
