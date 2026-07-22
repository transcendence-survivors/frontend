const REPOST_START_PATH = '/reposts' as const;

const REPOST_ENDPOINTS = {
	reposts: (postId: string) => `${REPOST_START_PATH}/${postId}`,
};

export { REPOST_ENDPOINTS };
