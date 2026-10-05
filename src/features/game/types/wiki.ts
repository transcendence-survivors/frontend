import { TomeIconType, WeaponIconType } from './icons';
import { StatType } from './stats';

export interface StatAffinity {
	stat: StatType;
	affinity?: number;
}

export interface WeaponCardProps {
	id: WeaponIconType;
	recommendedTomes: TomeIconType[];
	affectedBy: StatAffinity[];
}

export interface RarityValue {
	rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
	display: string;
}

export interface TomeCardProps {
	id: TomeIconType;
	target: 'weapons' | 'player' | 'upgrades';
	baseStat: number | string;
	rarities: RarityValue[];
	affectsWeapons?: WeaponIconType[];
}

export type MonsterId =
	| 'grunt'
	| 'skitter'
	| 'kraklet'
	| 'ravager'
	| 'venomweb'
	| 'bomber'
	| 'splitter'
	| 'necromancer'
	| 'wisp'
	| 'brute'
	| 'arakhnos'
	| 'gorvath'
	| 'khimaera'
	| 'abyssor';

export type MonsterAiKind =
	'chaser' | 'swarm' | 'tank' | 'charger' | 'ranged' | 'bomber' | 'summoner' | 'boss';

export const MAP_MONSTER_ID_TO_IMAGE: Record<MonsterId, string> = {
	grunt: '/images/monsters/normal/dog.png',
	skitter: '/images/monsters/normal/green-blob.png',
	kraklet: '/images/monsters/normal/cactoro.png',
	ravager: '/images/monsters/normal/ninja.png',
	venomweb: '/images/monsters/normal/green-spiky-blob.png',
	bomber: '/images/monsters/normal/mushnub.png',
	splitter: '/images/monsters/normal/pink-blob.png',
	necromancer: '/images/monsters/normal/wizard.png',
	wisp: '/images/monsters/normal/ghost.png',
	brute: '/images/monsters/normal/orc.png',

	arakhnos: '/images/monsters/boss/orc-skull.png',
	gorvath: '/images/monsters/boss/yeti.png',
	khimaera: '/images/monsters/boss/demon.png',
	abyssor: '/images/monsters/boss/mushroom-king.png',
} as const;

export type MonsterRank = 'normal' | 'boss';

export interface MonsterAttack {
	ai: MonsterAiKind;
	contactDamageMultiplier?: number;
	preferredRange?: number;
	retreatRange?: number;
	charge?: {
		speedMultiplier: number;
		durationS: number;
		cooldownS: number;
		damageMultiplier: number;
	};
	special?: {
		kind: string;
		cooldownS: number;
		radius?: number;
		damageMultiplier?: number;
		summons?: {
			kind: string;
			count: number;
		};
	};
}

export interface MonsterBaseStats {
	maxLife: number;
	damage: number;
	moveSpeed: number;
	attackRange: number;
	attackCooldownS: number;
	knockbackResistance: number;
	rewardXp: number;
}

export interface MonsterSpawn {
	fromSecond: number;
	weight: number;
	cost: number;
	canBeElite: boolean;
}

export interface MonsterCardProps {
	id: MonsterId;
	rank: MonsterRank;
	attack: MonsterAttack;
	baseStats: MonsterBaseStats;
	spawn: MonsterSpawn;
	onDeath?: {
		kind: string;
		count: number;
	};
}
