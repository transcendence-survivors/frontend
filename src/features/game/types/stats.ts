import { DeepKeys } from '@/libs/types';
import { GamePlayerStatsDetails } from './game';
import { TomeIconType } from './icons';
import { AppMessages } from '@/modules/i18n/messages/types';

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

export interface StatAttribute {
	key: Exclude<keyof GamePlayerStatsDetails, 'weapons' | 'id' | 'user'>;
	labelKey: DeepKeys<AppMessages['game']['labels']>;
	icon: TomeIconType;
	format: (val: number) => string;
}
