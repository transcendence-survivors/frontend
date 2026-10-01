import { GameTomeKind, GameWeaponKind } from './summary';

export type WeaponIconType = 'aura' | 'sword' | 'axe' | 'staff' | 'bow';

export type TomeIconType =
	| 'damage'
	| 'cooldown'
	| 'agility'
	| 'vitality'
	| 'armor'
	| 'blood'
	| 'range'
	| 'size'
	| 'duration'
	| 'quantity'
	| 'fortune';

export type IconType = WeaponIconType | TomeIconType;

export const MAP_WEAPON_KIND_TO_ICON: Record<GameWeaponKind, WeaponIconType> = {
	[GameWeaponKind.AURA]: 'aura',
	[GameWeaponKind.SWORD]: 'sword',
	[GameWeaponKind.AXE]: 'axe',
	[GameWeaponKind.STAFF]: 'staff',
	[GameWeaponKind.BOW]: 'bow',
};

export const MAP_TOME_KIND_TO_ICON: Record<GameTomeKind, TomeIconType> = {
	[GameTomeKind.DAMAGE]: 'damage',
	[GameTomeKind.COOLDOWN]: 'cooldown',
	[GameTomeKind.AGILITY]: 'agility',
	[GameTomeKind.VITALITY]: 'vitality',
	[GameTomeKind.ARMOR]: 'armor',
	[GameTomeKind.BLOOD]: 'blood',
	[GameTomeKind.RANGE]: 'range',
	[GameTomeKind.SIZE]: 'size',
	[GameTomeKind.DURATION]: 'duration',
	[GameTomeKind.QUANTITY]: 'quantity',
	[GameTomeKind.FORTUNE]: 'fortune',
};
