import { api, buildUrlParams, isApiError } from '@/libs/api';
import { GAME_ENDPOINTS } from '../constants/endpoints';
import { GetLeaderboardParams, GetLeaderboardResponse } from '../types/leaderboard';

export const getLeaderboard = async (params: GetLeaderboardParams) => {
	const urlParams = buildUrlParams(params);
	const res = await api.get<GetLeaderboardResponse>(
		`${GAME_ENDPOINTS.getLeaderboard}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};
