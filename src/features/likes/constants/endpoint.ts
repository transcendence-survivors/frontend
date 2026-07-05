const LIKE_START_PATH = '/likes' as const;

const LIKE_ENDPOINTS = {
	likes: (postId: string) => `${LIKE_START_PATH}/${postId}`,
};

export { LIKE_ENDPOINTS };
