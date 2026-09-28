import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useUser } from '@/features/auth/stores/session';

import { createPost } from '../api/posts';
import { postKeys } from '../constants/query-keys';
import { invalidatePostQueries, updatePostInCaches } from '../utils/post-cache';

export function useCreatePost(parentPostId?: string, quotedPostId?: string) {
	const queryClient = useQueryClient();
	const user = useUser();

	return useMutation({
		mutationFn: ({ content, file }: { content?: string; file?: File }) =>
			createPost(content, file, parentPostId, quotedPostId),
		onSuccess: () => {
			if (parentPostId) {
				updatePostInCaches(queryClient, parentPostId, (post) => ({
					...post,
					commentCount: post.commentCount + 1,
				}));
			}
			if (quotedPostId) {
				updatePostInCaches(queryClient, quotedPostId, (post) => ({
					...post,
					repostCount: post.repostCount + 1,
				}));
			}

			if (!user) return;

			if (parentPostId) {
				invalidatePostQueries(queryClient, [
					['posts', parentPostId],
					postKeys.userComments(user.username),
				]);
			} else {
				invalidatePostQueries(queryClient, [postKeys.userPosts(user.username)]);
			}
		},
	});
}
