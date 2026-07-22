import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { addRepost, deleteRepost } from '../api/reposts';
import { fetchPosts } from '@/features/posts/api/posts';

type PostsPage = Awaited<ReturnType<typeof fetchPosts>>;

function toggleRepostInCache(postId: string, isReposted: boolean, delta: number) {
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
							? {
									...post,
									isReposted,
									repostCount: post.repostCount + delta,
								}
							: post,
					),
				},
			})),
		};
	};
}

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
	return useMutation({
		mutationKey: ['reposts', action],
		mutationFn: requestActionFns[action],
		onSuccess: (_data, postId) => {
			queryClient.setQueriesData<InfiniteData<PostsPage>>(
				{ queryKey: ['posts'] },
				action === 'repost'
					? toggleRepostInCache(postId, true, 1)
					: toggleRepostInCache(postId, false, -1),
			);
		},
	});
};

export const useAddRepost = () => useRepostAction('repost');
export const useDeleteRepost = () => useRepostAction('unrepost');
