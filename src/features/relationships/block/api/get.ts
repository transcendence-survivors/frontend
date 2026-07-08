import { api, buildUrlParams, isApiError } from '@/libs/api';
import { BLOCK_ENDPOINTS } from '../constants/endpoints';
import { GetBlocksParams, GetBlocksResponse } from '../types';

const getBlocks = async (params: GetBlocksParams) => {
	const urlParams = buildUrlParams(params);
	const res = await api.get<GetBlocksResponse>(
		`${BLOCK_ENDPOINTS.getblocks}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export { getBlocks };
