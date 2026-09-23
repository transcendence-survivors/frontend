import { AppMessages } from '@/modules/i18n/messages/types';
import { NavLink } from '@/modules/i18n/utils/navigation';

export const navItems = [
	{ key: 'home', labelKey: 'home' },
	{ key: 'lore', labelKey: 'lore' },
	{ key: 'support', labelKey: 'support' },
] as const satisfies NavLink<AppMessages['nav']>[];

export type KeyNavItem = (typeof navItems)[number]['key'];
