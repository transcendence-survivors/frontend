import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

const SYSTEM_THEME_KEY = 'system' as const;
type SystemThemeKey = typeof SYSTEM_THEME_KEY;

const THEMES = [
	'dark',
	'light',
	'emerald-dark',
	'emerald-light',
	'synthwave-dark',
	'synthwave-light',
	'crimson-dark',
	'crimson-light',
	SYSTEM_THEME_KEY,
] as const;
const THEME_LENGTH = THEMES.length;
const THEME_COUNTS = THEME_LENGTH - 1;

type ResolvedTheme = Exclude<Theme, SystemThemeKey> | null;
type Theme = (typeof THEMES)[number];

const DEFAULT_THEME = 'system' as const satisfies Theme;

const THEME_ICONS = {
	'dark': MoonIcon,
	'light': SunIcon,
	'emerald-dark': MoonIcon,
	'emerald-light': SunIcon,
	'synthwave-dark': MoonIcon,
	'synthwave-light': SunIcon,
	'crimson-dark': MoonIcon,
	'crimson-light': SunIcon,
	'system': MonitorIcon,
} as const satisfies Record<Theme, React.ComponentType>;

export {
	THEMES,
	THEME_LENGTH,
	THEME_COUNTS,
	DEFAULT_THEME,
	SYSTEM_THEME_KEY,
	THEME_ICONS,
};
export type { Theme, ResolvedTheme, SystemThemeKey };
