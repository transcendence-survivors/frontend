import { TomeIconType, WeaponIconType } from './icons';

export type StatType =
	| 'attackDamage'
	| 'attackSpeed'
	| 'range'
	| 'size'
	| 'duration'
	| 'quantity'
	| 'penetration'
	| 'moveSpeed'
	| 'maxHealth'
	| 'armor'
	| 'lifesteal'
	| 'luck';

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
