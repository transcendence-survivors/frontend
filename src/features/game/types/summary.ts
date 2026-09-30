export enum GameWeaponKind {
	SWORD = 'SWORD',
	BOW = 'BOW',
	STAFF = 'STAFF',
	AXE = 'AXE',
	AURA = 'AURA',
}

export interface UserGameWeaponSummary {
	kind: GameWeaponKind;
	timesUsed: number;
	highestLevel: number;
}

export interface UserGameSummary {
	id: string;
	userId: string;
	totalGamesPlayed: number;
	totalKills: number;
	totalSurvivalTime: number;
	highestSurvivalTime: number;
	highestKills: number;
	lastPlayedAt: string;
	weaponSummaries: UserGameWeaponSummary[];
}
