'use client';

import { useTheme } from 'next-themes';
import { Theme, THEME_ICONS, THEMES } from '../constants/themes';

const useTypedTheme = () => {
	const { theme, resolvedTheme, setTheme } = useTheme();

	return {
		themeIcons: THEME_ICONS,
		themes: THEMES,
		current: theme as Theme | undefined,
		resolved: resolvedTheme as Theme | undefined,
		setTheme: (theme: Theme) => setTheme(theme),
	};
};

export default useTypedTheme;
