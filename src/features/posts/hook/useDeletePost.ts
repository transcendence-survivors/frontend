import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePost } from '../api/posts';
import { Post } from '../types/post';
import {
	invalidatePostQueries,
	removePostFromCaches,
	updatePostInCaches,
} from '../utils/post-cache';

export const useDeletePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['posts', 'delete'],
		mutationFn: (post: Post) => deletePost(post.id),
		onSuccess: (_data, post) => {
			removePostFromCaches(queryClient, post.id);

			if (post.parentPostId) {
				updatePostInCaches(queryClient, post.parentPostId, (parent) => ({
					...parent,
					commentCount: Math.max(parent.commentCount - 1, 0),
				}));
			}
			if (post.quotedPostId) {
				updatePostInCaches(queryClient, post.quotedPostId, (quoted) => ({
					...quoted,
					repostCount: Math.max(quoted.repostCount - 1, 0),
				}));
			}

			invalidatePostQueries(queryClient);
		},
	});
};
