import { GameWeaponKind } from './summary';

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
