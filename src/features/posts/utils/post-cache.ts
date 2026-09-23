import { InfiniteData, QueryClient, QueryKey } from '@tanstack/react-query';

import { fetchPosts } from '../api/posts';
import {
	ALL_POST_KEYS,
	DETAIL_KEY,
	POST_LIST_KEYS,
	postKeys,
} from '../constants/query-keys';
import { Post } from '../types/post';

type PostsPage = Awaited<ReturnType<typeof fetchPosts>>;

function patchPost(post: Post, postId: string, patch: (post: Post) => Post): Post {
	if (post.id === postId) {
		return patch(post);
	}

	if (post.quotedPost && post.quotedPost.id === postId) {
		return { ...post, quotedPost: patch(post.quotedPost) };
	}

	return post;
}

function updateLists(
	queryClient: QueryClient,
	updatePosts: (posts: Post[]) => Post[],
) {
	for (const queryKey of POST_LIST_KEYS) {
		queryClient.setQueriesData<InfiniteData<PostsPage>>({ queryKey }, (old) => {
			if (!old) return old;

			return {
				...old,
				pages: old.pages.map((page) => ({
					...page,
					data: { ...page.data, data: updatePosts(page.data.data) },
				})),
			};
		});
	}
}

export function updatePostInCaches(
	queryClient: QueryClient,
	postId: string,
	patch: (post: Post) => Post,
) {
	updateLists(queryClient, (posts) =>
		posts.map((post) => patchPost(post, postId, patch)),
	);

	queryClient.setQueriesData<Post>({ queryKey: DETAIL_KEY }, (old) =>
		old ? patchPost(old, postId, patch) : old,
	);
}

export function removePostFromCaches(queryClient: QueryClient, postId: string) {
	updateLists(queryClient, (posts) => posts.filter((post) => post.id !== postId));
	queryClient.removeQueries({ queryKey: postKeys.detail(postId) });
}

export function snapshotPostCaches(queryClient: QueryClient) {
	const snapshot: [QueryKey, unknown][] = [];

	for (const queryKey of ALL_POST_KEYS) {
		snapshot.push(...queryClient.getQueriesData({ queryKey }));
	}

	return snapshot;
}

export function restorePostCaches(
	queryClient: QueryClient,
	snapshot?: [QueryKey, unknown][],
) {
	if (!snapshot) return;

	for (const [queryKey, data] of snapshot) {
		queryClient.setQueryData(queryKey, data);
	}
}

export async function cancelPostQueries(queryClient: QueryClient) {
	for (const queryKey of ALL_POST_KEYS) {
		await queryClient.cancelQueries({ queryKey });
	}
}

export function invalidatePostQueries(
	queryClient: QueryClient,
	queryKeys = ALL_POST_KEYS,
) {
	for (const queryKey of queryKeys) {
		queryClient.invalidateQueries({ queryKey });
	}
}
