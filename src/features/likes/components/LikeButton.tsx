'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAddLike, useDeleteLike } from '../hook/useLikes';
import { Heart } from 'lucide-react';

interface likeButtonProps {
	postId: string;
	likeCount: number;
	isLiked: boolean;
}

export default function LikeButton({ postId, likeCount, isLiked }: likeButtonProps) {
	const [liked, setLiked] = useState(isLiked);
	const [count, setCount] = useState(likeCount);
	const addLike = useAddLike();
	const deleteLike = useDeleteLike();

	const isMutating = addLike.isPending || deleteLike.isPending;

	const handleClick = () => {
		if (isMutating) return;
		if (liked) {
			deleteLike.mutate(postId);
			setLiked(false);
			setCount((c) => c - 1);
		} else {
			addLike.mutate(postId);
			setLiked(true);
			setCount((c) => c + 1);
		}
	};

	return (
		<div className='flex items-center gap-0.5'>
			<Button
				variant='ghost'
				size='icon'
				className='p-2 rounded-full'
				aria-disabled={isMutating}
				onClick={handleClick}>
				<Heart className={`size-4 ${liked ? 'text-primary fill-primary' : ''}`} />
			</Button>
			{count > 0 && <span>{count}</span>}
		</div>
	);
}
