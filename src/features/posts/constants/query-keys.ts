export const DETAIL_KEY = ['post'];
export const FEED_KEY = ['posts'];
export const USER_POSTS_KEY = ['userPosts'];
export const USER_COMMENTS_KEY = ['userComments'];
export const USER_LIKES_KEY = ['userLikes'];
export const USER_REPOSTS_KEY = ['userReposts'];

export const POST_LIST_KEYS = [
	FEED_KEY,
	USER_POSTS_KEY,
	USER_COMMENTS_KEY,
	USER_LIKES_KEY,
	USER_REPOSTS_KEY,
];

export const ALL_POST_KEYS = [DETAIL_KEY, ...POST_LIST_KEYS];

export const postKeys = {
	detail: (postId: string) => ['post', postId],
	feed: (parentPostId?: string, search?: string, feed?: string) => [
		'posts',
		parentPostId,
		search,
		feed,
	],
	userPosts: (username: string) => ['userPosts', username],
	userComments: (username: string) => ['userComments', username],
	userLikes: (username: string) => ['userLikes', username],
	userReposts: (username: string) => ['userReposts', username],
};
