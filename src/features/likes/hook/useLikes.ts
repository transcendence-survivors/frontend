import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { addLike, deleteLike } from '../api/likes';
import { fetchPosts } from '@/features/posts/api/posts';

type PostsPage = Awaited<ReturnType<typeof fetchPosts>>;

function toggleLikeInCache(postId: string, isLiked: boolean, delta: number) {
	return (old: InfiniteData<PostsPage> | undefined) => {
		if (!old) return old;
		return {
			...old,
			pages: old.pages.map((page) => ({
				...page,
				data: {
					...page.data,
					data: page.data.data.map((post) =>
						post.id === postId
							? { ...post, isLiked, likeCount: post.likeCount + delta }
							: post,
					),
				},
			})),
		};
	};
}

export function useAddLike() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addLike,
		onSuccess: (_data, postId) => {
			queryClient.setQueriesData<InfiniteData<PostsPage>>(
				{ queryKey: ['posts'] },
				toggleLikeInCache(postId, true, 1),
			);
		},
	});
}

export function useDeleteLike() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteLike,
		onSuccess: (_data, postId) => {
			queryClient.setQueriesData<InfiniteData<PostsPage>>(
				{ queryKey: ['posts'] },
				toggleLikeInCache(postId, false, -1),
			);
		},
	});
}
