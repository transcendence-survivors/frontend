import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

const SYSTEM_THEME_KEY = 'system' as const;
type SystemThemeKey = typeof SYSTEM_THEME_KEY;

const THEMES = ['light', 'dark', 'neon', SYSTEM_THEME_KEY] as const;
const THEME_LENGTH = THEMES.length;
const THEME_COUNTS = THEME_LENGTH - 1;

type ResolvedTheme = Exclude<Theme, SystemThemeKey> | null;
type Theme = (typeof THEMES)[number];

const DEFAULT_THEME = 'system' as const satisfies Theme;

const THEME_ICONS: Record<Theme, React.ComponentType> = {
	light: SunIcon,
	dark: MoonIcon,
	neon: MonitorIcon,
	system: MonitorIcon,
};

export {
	THEMES,
	THEME_LENGTH,
	THEME_COUNTS,
	DEFAULT_THEME,
	SYSTEM_THEME_KEY,
	THEME_ICONS,
};
export type { Theme, ResolvedTheme, SystemThemeKey };
