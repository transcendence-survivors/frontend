const POST_START_PATH = '/posts' as const;

type StartPath = typeof POST_START_PATH;
type PostEndpoint = `${StartPath}`;

const POST_ENDPOINTS = {
	getPost: `${POST_START_PATH}`,
} as const satisfies Record<string, PostEndpoint>;

export { POST_ENDPOINTS };
