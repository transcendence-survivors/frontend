const BLOCKS_START_PATH = '/blocks' as const;

type StartPath = typeof BLOCKS_START_PATH;
type BlocksEndpoint = `${StartPath}/${string}` | `${StartPath}`;

const BLOCK_ENDPOINTS = {
	getblocks: `${BLOCKS_START_PATH}`,
	getblocksCount: `${BLOCKS_START_PATH}/count`,
	deleteBlock: `${BLOCKS_START_PATH}`,
	addBlock: `${BLOCKS_START_PATH}`,
} as const satisfies Record<string, BlocksEndpoint>;

export { BLOCK_ENDPOINTS };
