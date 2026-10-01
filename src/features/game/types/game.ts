import { BaseUser } from '@/features/user/type';
import { GameTomeKind, GameWeaponKind } from './summary';
import { CursorParams, CursorResponse } from '@/libs/api';

export interface GamePlayerWeaponStats {
	id: string;
	kind: GameWeaponKind;
	level: number;
}

export interface GamePlayerTomeSummary {
	id: string;
	kind: GameTomeKind;
	level: number;
}

export interface GamePlayerStatsDetails {
	id: string;
	maxHealth: number;
	attackSpeed: number;
	moveSpeed: number;
	attackDamage: number;
	armor: number;
	luck: number;
	killAmount: number;
	lifesteal: number;
	range: number;
	size: number;
	duration: number;
	quantity: number;
	penetration: number;
	weapons: GamePlayerWeaponStats[];
	tomes: GamePlayerTomeSummary[];
	user: BaseUser | null;
}

export interface GameStatsDetails {
	id: string;
	survivalTime: number;
	totalKills: number;
	players: GamePlayerStatsDetails[];
	createdAt: Date | string;
}

export type GamePlayerStatsPreview = Pick<
	GamePlayerStatsDetails,
	'id' | 'killAmount' | 'user'
>;

export type GameHistoryPreview = Pick<
	GameStatsDetails,
	'id' | 'survivalTime' | 'totalKills' | 'createdAt'
> & {
	players: GamePlayerStatsPreview[];
};

export type GamesHistoryOrderBy =
	| 'created-asc'
	| 'created-desc'
	| 'survival-asc'
	| 'survival-desc'
	| 'kills-asc'
	| 'kills-desc';

export type GetGamesHystoryResponse = CursorResponse<GameHistoryPreview[]>;
export type GetGamesHistoryParams = Omit<CursorParams<GamesHistoryOrderBy>, 'search'> & {
	username?: string;
};
