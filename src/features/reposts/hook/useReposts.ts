import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useUser } from '@/features/auth/stores/session';
import { postKeys } from '@/features/posts/constants/query-keys';
import {
	cancelPostQueries,
	invalidatePostQueries,
	restorePostCaches,
	snapshotPostCaches,
	updatePostInCaches,
} from '@/features/posts/utils/post-cache';

import { addRepost, deleteRepost } from '../api/reposts';

type RepostRequestAction = 'repost' | 'unrepost';

const requestActionFns: Record<
	RepostRequestAction,
	(postId: string) => Promise<unknown>
> = {
	repost: addRepost,
	unrepost: deleteRepost,
};

const useRepostAction = (action: RepostRequestAction) => {
	const queryClient = useQueryClient();
	const user = useUser();
	const isReposted = action === 'repost';

	return useMutation({
		mutationKey: ['reposts', action],
		mutationFn: requestActionFns[action],
		onMutate: async (postId: string) => {
			await cancelPostQueries(queryClient);
			const snapshot = snapshotPostCaches(queryClient);

			updatePostInCaches(queryClient, postId, (post) => ({
				...post,
				isReposted,
				repostCount: post.repostCount + (isReposted ? 1 : -1),
			}));

			return snapshot;
		},
		onError: (_error, _postId, snapshot) =>
			restorePostCaches(queryClient, snapshot),
		onSettled: () => {
			if (user) {
				invalidatePostQueries(queryClient, [postKeys.userReposts(user.username)]);
			}
		},
	});
};

export const useAddRepost = () => useRepostAction('repost');
export const useDeleteRepost = () => useRepostAction('unrepost');
