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

type LikeRequestAction = 'like' | 'unlike';

const requestActionFns: Record<LikeRequestAction, (postId: string) => Promise<unknown>> =
	{
		like: addLike,
		unlike: deleteLike,
	};

const useLikeAction = (action: LikeRequestAction) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['likes', action],
		mutationFn: requestActionFns[action],
		onSuccess: (_data, postId) => {
			queryClient.setQueriesData<InfiniteData<PostsPage>>(
				{ queryKey: ['posts'] },
				action === 'like'
					? toggleLikeInCache(postId, true, 1)
					: toggleLikeInCache(postId, false, -1),
			);
		},
	});
};

export const useAddLike = () => useLikeAction('like');
export const useDeleteLike = () => useLikeAction('unlike');
