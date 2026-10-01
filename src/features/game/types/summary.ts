export enum GameWeaponKind {
	SWORD = 'SWORD',
	BOW = 'BOW',
	STAFF = 'STAFF',
	AXE = 'AXE',
	AURA = 'AURA',
}

export enum GameTomeKind {
	DAMAGE = 'DAMAGE',
	COOLDOWN = 'COOLDOWN',
	AGILITY = 'AGILITY',
	VITALITY = 'VITALITY',
	ARMOR = 'ARMOR',
	BLOOD = 'BLOOD',
	RANGE = 'RANGE',
	SIZE = 'SIZE',
	DURATION = 'DURATION',
	QUANTITY = 'QUANTITY',
	FORTUNE = 'FORTUNE',
}

export interface UserGameWeaponSummary {
	kind: GameWeaponKind;
	timesUsed: number;
	highestLevel: number;
}

export interface UserGameTomeSummary {
	kind: GameTomeKind;
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
	tomeSummaries: UserGameTomeSummary[];
}
