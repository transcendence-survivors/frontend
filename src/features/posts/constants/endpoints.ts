import { Endpoint } from '@/libs/api';

const POST_START_PATH = '/posts' as const;

type StartPath = typeof POST_START_PATH;
type PostEndpoint = `${StartPath}`;

const POST_ENDPOINTS = {
	getPosts: POST_START_PATH,
	getReplies: (postId: string) => `${POST_START_PATH}/${postId}/replies`,
	getPost: (id: string) => `${POST_START_PATH}/${id}`,
	getUserPosts: (username: string) => `${POST_START_PATH}/user/${username}/posts`,
	getUserComments: (username: string) => `${POST_START_PATH}/user/${username}/comments`,
	getUserReposts: (username: string) => `${POST_START_PATH}/user/${username}/reposts`,
	getUserLikes: (username: string) => `${POST_START_PATH}/user/${username}/likes`,
	deletePost: (id: string) => `${POST_START_PATH}/${id}`,
} as const satisfies Record<string, Endpoint<PostEndpoint>>;

export { POST_ENDPOINTS };
