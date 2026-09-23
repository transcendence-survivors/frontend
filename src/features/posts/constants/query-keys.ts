export const POST_DETAIL_ROOT = 'post';

export const POST_LIST_ROOTS = [
	'posts',
	'userPosts',
	'userComments',
	'userLikes',
	'userReposts',
] as const;

export const POST_QUERY_ROOTS = [POST_DETAIL_ROOT, ...POST_LIST_ROOTS] as const;

export const postKeys = {
	details: () => [POST_DETAIL_ROOT] as const,
	detail: (postId: string) => [POST_DETAIL_ROOT, postId] as const,
	feed: (parentPostId?: string) => ['posts', parentPostId] as const,
	userPosts: (username: string) => ['userPosts', username] as const,
	userComments: (username: string) => ['userComments', username] as const,
	userLikes: (username: string) => ['userLikes', username] as const,
	userReposts: (username: string) => ['userReposts', username] as const,
};
