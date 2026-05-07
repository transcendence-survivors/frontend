const SYSTEM_THEME_KEY = 'system' as const;
type SystemThemeKey = typeof SYSTEM_THEME_KEY;

const THEMES = ['light', 'dark', 'neon', SYSTEM_THEME_KEY] as const;
const THEME_LENGTH = THEMES.length;
const THEME_COUNTS = THEME_LENGTH - 1;

type ResolvedTheme = Exclude<Theme, SystemThemeKey> | null;
type Theme = (typeof THEMES)[number];

const DEFAULT_THEME = 'system' as const satisfies Theme;

export { THEMES, THEME_LENGTH, THEME_COUNTS, DEFAULT_THEME, SYSTEM_THEME_KEY };
export type { Theme, ResolvedTheme, SystemThemeKey };
