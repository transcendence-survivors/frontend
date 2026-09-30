import { api, buildUrlParams, isApiError } from '@/libs/api';
import { GAME_ENDPOINTS } from '../constants/endpoints';
import { GetGamesHistoryParams, GetGamesHystoryResponse } from '../types/game';

export const getHistory = async (params: GetGamesHistoryParams) => {
	const urlParams = buildUrlParams(params);
	if (params.username) {
		urlParams.append('username', params.username);
	}
	const res = await api.get<GetGamesHystoryResponse>(
		`${GAME_ENDPOINTS.getHistory}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};
