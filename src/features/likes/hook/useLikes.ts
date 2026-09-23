import { useMutation, useQueryClient } from '@tanstack/react-query';

import { USER_LIKES_KEY } from '@/features/posts/constants/query-keys';
import {
	cancelPostQueries,
	invalidatePostQueries,
	restorePostCaches,
	snapshotPostCaches,
	updatePostInCaches,
} from '@/features/posts/utils/post-cache';

import { addLike, deleteLike } from '../api/likes';

type LikeRequestAction = 'like' | 'unlike';

const requestActionFns: Record<LikeRequestAction, (postId: string) => Promise<unknown>> =
	{
		like: addLike,
		unlike: deleteLike,
	};

const useLikeAction = (action: LikeRequestAction) => {
	const queryClient = useQueryClient();
	const isLiked = action === 'like';

	return useMutation({
		mutationKey: ['likes', action],
		mutationFn: requestActionFns[action],
		onMutate: async (postId: string) => {
			await cancelPostQueries(queryClient);
			const snapshot = snapshotPostCaches(queryClient);

			updatePostInCaches(queryClient, postId, (post) => ({
				...post,
				isLiked,
				likeCount: post.likeCount + (isLiked ? 1 : -1),
			}));

			return snapshot;
		},
		onError: (_error, _postId, snapshot) =>
			restorePostCaches(queryClient, snapshot),
		onSettled: () => invalidatePostQueries(queryClient, [USER_LIKES_KEY]),
	});
};

export const useAddLike = () => useLikeAction('like');
export const useDeleteLike = () => useLikeAction('unlike');
