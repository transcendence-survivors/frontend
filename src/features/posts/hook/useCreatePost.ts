import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';
import { invalidatePostQueries, updatePostInCaches } from '../utils/post-cache';

export function useCreatePost(parentPostId?: string, quotedPostId?: string) {
	const queryClient = useQueryClient();

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

			invalidatePostQueries(queryClient);
		},
	});
}
