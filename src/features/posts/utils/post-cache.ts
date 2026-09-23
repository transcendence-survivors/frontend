import { InfiniteData, QueryClient, QueryKey } from '@tanstack/react-query';

import { fetchPosts } from '../api/posts';
import { POST_LIST_ROOTS, POST_QUERY_ROOTS, postKeys } from '../constants/query-keys';
import { Post } from '../types/post';

type PostsPage = Awaited<ReturnType<typeof fetchPosts>>;
type PostPatch = (post: Post) => Post;
type PostCacheSnapshot = [QueryKey, unknown][];

const hasRoot = (queryKey: QueryKey, roots: readonly string[]) =>
	typeof queryKey[0] === 'string' && roots.includes(queryKey[0]);

const listFilter = (roots: readonly string[] = POST_LIST_ROOTS) => ({
	predicate: (query: { queryKey: QueryKey }) => hasRoot(query.queryKey, roots),
});

function patchPost(post: Post, postId: string, patch: PostPatch): Post {
	const quotedPost = post.quotedPost
		? patchPost(post.quotedPost, postId, patch)
		: undefined;
	const next = quotedPost === post.quotedPost ? post : { ...post, quotedPost };

	return next.id === postId ? patch(next) : next;
}

function mapPage(page: PostsPage, map: (posts: Post[]) => Post[]): PostsPage {
	return { ...page, data: { ...page.data, data: map(page.data.data) } };
}

function mapLists(
	queryClient: QueryClient,
	map: (posts: Post[]) => Post[],
	roots?: readonly string[],
) {
	queryClient.setQueriesData<InfiniteData<PostsPage>>(
		listFilter(roots),
		(old) =>
			old && { ...old, pages: old.pages.map((page) => mapPage(page, map)) },
	);
}

export function updatePostInCaches(
	queryClient: QueryClient,
	postId: string,
	patch: PostPatch,
) {
	mapLists(queryClient, (posts) =>
		posts.map((post) => patchPost(post, postId, patch)),
	);
	queryClient.setQueriesData<Post>({ queryKey: postKeys.details() }, (old) =>
		old ? patchPost(old, postId, patch) : old,
	);
}

export function removePostFromCaches(queryClient: QueryClient, postId: string) {
	mapLists(queryClient, (posts) => posts.filter((post) => post.id !== postId));
	queryClient.removeQueries({ queryKey: postKeys.detail(postId) });
}

export function snapshotPostCaches(queryClient: QueryClient): PostCacheSnapshot {
	return queryClient.getQueriesData(listFilter(POST_QUERY_ROOTS));
}

export function restorePostCaches(
	queryClient: QueryClient,
	snapshot?: PostCacheSnapshot,
) {
	snapshot?.forEach(([queryKey, data]) => queryClient.setQueryData(queryKey, data));
}

export function cancelPostQueries(queryClient: QueryClient) {
	return queryClient.cancelQueries(listFilter(POST_QUERY_ROOTS));
}

export function invalidatePostQueries(
	queryClient: QueryClient,
	roots: readonly string[] = POST_QUERY_ROOTS,
) {
	return queryClient.invalidateQueries(listFilter(roots));
}
