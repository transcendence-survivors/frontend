import { useMutation } from '@tanstack/react-query';
import { createPost } from '../api/posts';
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries';

export function useCreatePost(parentPostId?: string, quotedPostId?: string) {
	const { invalidate } = useInvalidateQueries();
	return useMutation({
		mutationFn: ({ content, file }: { content?: string; file?: File }) =>
			createPost(content, file, parentPostId, quotedPostId),
		onSuccess: () => {
			invalidate(['posts', parentPostId], { mode: 'instant' });
		},
	});
}
