import { api, buildUrlParams, isApiError } from '@/libs/api';
import { BLOCK_ENDPOINTS } from '../constants/endpoints';
import {
	BlockAdd,
	GetBlocksCountParams,
	GetBlocksCountResponse,
	GetBlocksParams,
	GetBlocksResponse,
} from '../types';

export const getBlocks = async (params: GetBlocksParams) => {
	const urlParams = buildUrlParams(params);
	const res = await api.get<GetBlocksResponse>(
		`${BLOCK_ENDPOINTS.getblocks}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export const getBlocksCount = async (params: GetBlocksCountParams) => {
	const urlParams = buildUrlParams(params);
	const res = await api.get<GetBlocksCountResponse>(
		`${BLOCK_ENDPOINTS.getblocksCount}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export const addBlock = async (blockedId: string) => {
	const response = await api.post<BlockAdd>(`${BLOCK_ENDPOINTS.addBlock}`, {
		blockedId,
	});
	if (isApiError(response)) {
		throw new Error('Failed to delete block');
	}
};

export const deleteBlock = async (friendId: string) => {
	const response = await api.delete<void>(BLOCK_ENDPOINTS.deleteBlock(friendId));
	if (isApiError(response)) {
		throw new Error('Failed to delete block');
	}
};
