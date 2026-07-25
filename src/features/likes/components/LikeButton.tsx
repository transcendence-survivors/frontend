'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAddLike, useDeleteLike } from '../hook/useLikes';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface likeButtonProps {
	postId: string;
	likeCount: number;
	isLiked: boolean;
}

export default function LikeButton({ postId, likeCount, isLiked }: likeButtonProps) {
	const t = useTranslations('posts.actions');
	const [state, setState] = useState({
		isLiked: isLiked,
		likeCount: likeCount,
	});
	const addLike = useAddLike();
	const deleteLike = useDeleteLike();

	const isMutating = addLike.isPending || deleteLike.isPending;

	const handleClick = () => {
		if (isMutating) return;
		if (state.isLiked) {
			deleteLike.mutate(postId);
			setState((prev) => ({
				...prev,
				isLiked: false,
				likeCount: prev.likeCount - 1,
			}));
		} else {
			addLike.mutate(postId);
			setState((prev) => ({
				...prev,
				isLiked: true,
				likeCount: prev.likeCount + 1,
			}));
		}
	};

	return (
		<div className='flex items-center gap-0.5'>
			<Button
				variant='ghost'
				size='icon'
				className='p-2 rounded-full'
				aria-disabled={isMutating}
				aria-label={state.isLiked ? t('unlike') : t('like')}
				onClick={handleClick}>
				<Heart
					className={`size-4 ${state.isLiked ? 'text-primary fill-primary' : ''}`}
				/>
			</Button>
			{state.likeCount > 0 && <span>{state.likeCount}</span>}
		</div>
	);
}
