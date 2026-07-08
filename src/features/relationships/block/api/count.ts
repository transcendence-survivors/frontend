import { api, buildUrlParams, isApiError } from '@/libs/api';
import type { GetBlocksCountParams, GetBlocksCountResponse } from '../types';
import { BLOCK_ENDPOINTS } from '../constants/endpoints';

const getBlocksCount = async (params: GetBlocksCountParams) => {
	const urlParams = buildUrlParams(params);
	const res = await api.get<GetBlocksCountResponse>(
		`${BLOCK_ENDPOINTS.getblocksCount}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export { getBlocksCount };
