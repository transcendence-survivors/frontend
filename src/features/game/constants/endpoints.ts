import { Endpoint } from '@/libs/api/helpers/types';

const GAME_START_PATH = 'game' as const;

type StartPath = typeof GAME_START_PATH;

export const GAME_ENDPOINTS = {
	getSummary: (username: string) => `${GAME_START_PATH}/${username}/summary`,
	getLeaderboard: `${GAME_START_PATH}/leaderboard`,
	getHistory: `${GAME_START_PATH}`,
	getGame: (gameId: string) => `${GAME_START_PATH}/${gameId}`,
} as const satisfies Record<string, Endpoint<StartPath>>;
