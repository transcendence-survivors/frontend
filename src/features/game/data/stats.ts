import { StatAttribute, StatType } from '../types/stats';

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

export const STAT_ATTRIBUTES = [
	{
		key: 'maxHealth',
		labelKey: 'health',
		icon: 'vitality',
		format: (v) => `${v}`,
	},
	{
		key: 'attackDamage',
		labelKey: 'damage',
		icon: 'damage',
		format: (v) => `${v}`,
	},
	{
		key: 'attackSpeed',
		labelKey: 'attackSpeed',
		icon: 'cooldown',
		format: (v) => `${v.toFixed(2)}x`,
	},
	{
		key: 'moveSpeed',
		labelKey: 'moveSpeed',
		icon: 'agility',
		format: (v) => `${v}`,
	},
	{
		key: 'armor',
		labelKey: 'armor',
		icon: 'armor',
		format: (v) => `${v}`,
	},
	{
		key: 'lifesteal',
		labelKey: 'lifesteal',
		icon: 'blood',
		format: (v) => `${(v * 100).toFixed(0)}%`,
	},
	{
		key: 'range',
		labelKey: 'range',
		icon: 'range',
		format: (v) => `${v.toFixed(2)}x`,
	},
	{
		key: 'size',
		labelKey: 'size',
		icon: 'size',
		format: (v) => `${v.toFixed(2)}x`,
	},
	{
		key: 'duration',
		labelKey: 'duration',
		icon: 'duration',
		format: (v) => `${v.toFixed(2)}s`,
	},
	{
		key: 'quantity',
		labelKey: 'quantity',
		icon: 'quantity',
		format: (v) => `+${v}`,
	},
	{
		key: 'luck',
		labelKey: 'luck',
		icon: 'fortune',
		format: (v) => `${v.toFixed(2)}x`,
	},
] as const satisfies ReadonlyArray<StatAttribute>;
