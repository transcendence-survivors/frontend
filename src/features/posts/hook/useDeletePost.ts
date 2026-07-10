import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost, fetchPosts } from '../api/posts';

type PostsPage = Awaited<ReturnType<typeof fetchPosts>>;

function removePostFromCache(postId: string) {
	return (old: InfiniteData<PostsPage> | undefined) => {
		if (!old) return old;
		return {
			...old,
			pages: old.pages.map((page) => ({
				...page,
				data: {
					...page.data,
					data: page.data.data.filter((post) => post.id !== postId),
				},
			})),
		};
	};
}

export const useDeletePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['posts', 'delete'],
		mutationFn: deletePost,
		onSuccess: (_data, postId) => {
			queryClient.setQueriesData<InfiniteData<PostsPage>>(
				{ queryKey: ['posts'] },
				removePostFromCache(postId),
			);
		},
	});
};
