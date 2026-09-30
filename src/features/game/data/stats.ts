import { StatType } from '../types/wiki';

export const STAT_KEYS: StatType[] = [
	'attackDamage',
	'attackSpeed',
	'range',
	'size',
	'duration',
	'quantity',
	'penetration',
	'moveSpeed',
	'maxHealth',
	'armor',
	'lifesteal',
	'luck',
] as const;
