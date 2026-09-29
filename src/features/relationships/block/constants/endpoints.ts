import { Endpoint } from '@/libs/api';

const BLOCKS_START_PATH = '/blocks' as const;

type StartPath = typeof BLOCKS_START_PATH;

const BLOCK_ENDPOINTS = {
	getblocks: `${BLOCKS_START_PATH}`,
	getblocksCount: `${BLOCKS_START_PATH}/count`,
	deleteBlock: (blockId: string) => `${BLOCKS_START_PATH}/${blockId}`,
	addBlock: `${BLOCKS_START_PATH}`,
} as const satisfies Record<string, Endpoint<StartPath>>;

export { BLOCK_ENDPOINTS };
