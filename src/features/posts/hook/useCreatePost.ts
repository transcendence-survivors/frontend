import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';

export function useCreatePost(parentPostId?: string, quotedPostId?: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ content, file }: { content?: string; file?: File }) =>
			createPost(content, file, parentPostId, quotedPostId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts', parentPostId] });
		},
	});
}
