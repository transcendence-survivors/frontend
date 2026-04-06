import { routeMap } from '@/i18n/routing';

export const LOGIN_PATH = routeMap.register.en;

// COOKIE
export const COOKIE_REFRESH_TOKEN = 'refreshToken';
export const COOKIE_ACCESS_TOKEN = 'accessToken';
export const COOKIE_AUTHORIZATION = 'authorization';

export const TOKEN_PREFIX = 'Bearer ';

// THEME
export const THEMES = ['light', 'dark', 'neon', 'system'] as const;
export const THEME_LENGTH = THEMES.length;
export const THEME_COUNTS = THEME_LENGTH - 1;

export type ResolvedTheme = Exclude<Theme, 'system'> | null;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = 'system';
