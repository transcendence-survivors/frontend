'use client';

import { useRef, useState } from 'react';
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

	// verrou synchrone : isPending (react-query) ne se met à jour qu'au
	// prochain render, trop tard pour bloquer un double-clic très rapide
	const isPendingRef = useRef(false);
	const isMutating = addLike.isPending || deleteLike.isPending;

	const handleClick = () => {
		if (isPendingRef.current) return;
		isPendingRef.current = true;

		if (state.isLiked) {
			setState((prev) => ({
				...prev,
				isLiked: false,
				likeCount: prev.likeCount - 1,
			}));
			deleteLike.mutate(postId, {
				onError: () => {
					setState((prev) => ({
						...prev,
						isLiked: true,
						likeCount: prev.likeCount + 1,
					}));
				},
				onSettled: () => {
					isPendingRef.current = false;
				},
			});
		} else {
			setState((prev) => ({
				...prev,
				isLiked: true,
				likeCount: prev.likeCount + 1,
			}));
			addLike.mutate(postId, {
				onError: () => {
					setState((prev) => ({
						...prev,
						isLiked: false,
						likeCount: prev.likeCount - 1,
					}));
				},
				onSettled: () => {
					isPendingRef.current = false;
				},
			});
		}
	};

	return (
		<Button
			variant='ghost'
			size='sm'
			className={`relative z-10 ${state.isLiked ? 'text-primary' : ''}`}
			disabled={isMutating}
			aria-label={state.isLiked ? t('unlike') : t('like')}
			onClick={handleClick}>
			<Heart className={state.isLiked ? 'fill-primary' : ''} />
			{state.likeCount > 0 && state.likeCount}
		</Button>
	);
}
