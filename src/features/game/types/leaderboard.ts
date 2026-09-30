import { CursorParams, CursorResponse } from '@/libs/api';
import { BaseUser } from '@/features/user/type';

export type LeaderboardOrderBy =
	| 'highest-kills-desc'
	| 'highest-survival-desc'
	| 'total-kills-desc'
	| 'total-games-desc';

export interface LeaderboardPreview {
	id: string;
	totalGamesPlayed: number;
	totalKills: number;
	totalSurvivalTime: number;
	highestSurvivalTime: number;
	highestKills: number;
	user: BaseUser | null;
}

export type GetLeaderboardResponse = CursorResponse<LeaderboardPreview[]>;
export type GetLeaderboardParams = Omit<CursorParams<LeaderboardOrderBy>, 'search'>;
