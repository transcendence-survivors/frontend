import { api, ApiError } from '@/libs/api';
import { UserGameSummary } from '../types/summary';
import { GAME_ENDPOINTS } from '../constants/endpoints';

export const getUserGameSummary = async (username: string) => {
	try {
		return await api.get<UserGameSummary>(GAME_ENDPOINTS.getSummary(username));
	} catch {
		return {
			code: 404,
			status: 'error',
			message: 'Failed to fetch user game summary',
		} satisfies ApiError;
	}
};
