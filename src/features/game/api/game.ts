import { api, ApiError } from '@/libs/api';
import { GameStatsDetails } from '../types/game';
import { GAME_ENDPOINTS } from '../constants/endpoints';

export const getGame = async (id: string) => {
	try {
		return await api.get<GameStatsDetails>(GAME_ENDPOINTS.getGame(id));
	} catch {
		return {
			code: 404,
			message: 'Game not found',
			status: 'error',
		} satisfies ApiError;
	}
};
