'use client';

import { useRef } from 'react';
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
	const addLike = useAddLike();
	const deleteLike = useDeleteLike();

	// verrou synchrone : isPending (react-query) ne se met à jour qu'au
	// prochain render, trop tard pour bloquer un double-clic très rapide
	const isPendingRef = useRef(false);
	const isMutating = addLike.isPending || deleteLike.isPending;

	const handleClick = () => {
		if (isPendingRef.current) return;
		isPendingRef.current = true;

		const mutation = isLiked ? deleteLike : addLike;
		mutation.mutate(postId, {
			onSettled: () => {
				isPendingRef.current = false;
			},
		});
	};

	return (
		<Button
			variant='ghost'
			size='sm'
			className={`relative z-10 ${isLiked ? 'text-primary' : ''}`}
			disabled={isMutating}
			aria-label={isLiked ? t('unlike') : t('like')}
			onClick={handleClick}>
			<Heart className={isLiked ? 'fill-primary' : ''} />
			{likeCount > 0 && likeCount}
		</Button>
	);
}
