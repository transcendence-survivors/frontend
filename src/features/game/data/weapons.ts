import { WeaponCardProps } from '../types/wiki';

export const WEAPONS: WeaponCardProps[] = [
	{
		id: 'aura',
		recommendedTomes: ['size', 'cooldown', 'damage'],
		affectedBy: [
			{ stat: 'attackDamage', affinity: 1 },
			{ stat: 'attackSpeed', affinity: 0.8 },
			{ stat: 'range', affinity: 1 },
			{ stat: 'size', affinity: 1 },
		],
	},
	{
		id: 'sword',
		recommendedTomes: ['duration', 'size', 'damage'],
		affectedBy: [
			{ stat: 'attackDamage', affinity: 1 },
			{ stat: 'attackSpeed', affinity: 1 },
			{ stat: 'range', affinity: 0.65 },
			{ stat: 'size', affinity: 1 },
			{ stat: 'duration' },
		],
	},
	{
		id: 'axe',
		recommendedTomes: ['size', 'duration', 'range'],
		affectedBy: [
			{ stat: 'attackDamage', affinity: 1 },
			{ stat: 'attackSpeed', affinity: 0.5 },
			{ stat: 'range', affinity: 1 },
			{ stat: 'size', affinity: 1.25 },
			{ stat: 'duration' },
		],
	},
	{
		id: 'staff',
		recommendedTomes: ['quantity', 'range', 'damage'],
		affectedBy: [
			{ stat: 'attackDamage', affinity: 1 },
			{ stat: 'attackSpeed', affinity: 1 },
			{ stat: 'range', affinity: 1.25 },
			{ stat: 'size', affinity: 1 },
			{ stat: 'duration' },
			{ stat: 'quantity' },
			{ stat: 'penetration' },
		],
	},
	{
		id: 'bow',
		recommendedTomes: ['cooldown', 'quantity', 'damage'],
		affectedBy: [
			{ stat: 'attackDamage', affinity: 0.8 },
			{ stat: 'attackSpeed', affinity: 1.2 },
			{ stat: 'range', affinity: 1 },
			{ stat: 'size', affinity: 1 },
			{ stat: 'duration' },
			{ stat: 'quantity' },
			{ stat: 'penetration' },
		],
	},
] as const;
