import { CursorParams, CursorResponse } from '@/libs/api/helpers/types';
import { BaseUser } from '@/features/user/type';

interface Block {
	id: string;
	since: Date;
	blocked: BaseUser;
}

type BlockAdd = Block;

type BlockOrderBy =
	| 'updated-asc'
	| 'updated-desc'
	| 'username-asc'
	| 'username-desc'
	| 'displayname-asc'
	| 'displayname-desc';

type GetBlocksParams = CursorParams<BlockOrderBy>;
type GetBlocksResponse = CursorResponse<Block[]>;

type GetBlocksCountParams = Pick<GetBlocksParams, 'search'>;
type GetBlocksCountResponse = { count: number };

export type {
	Block,
	BlockAdd,
	GetBlocksParams,
	GetBlocksResponse,
	GetBlocksCountParams,
	GetBlocksCountResponse,
};
