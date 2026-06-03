'use client';

import { useTheme } from 'next-themes';
import { Theme, THEMES } from '../constants/themes';

const useTypedTheme = () => {
	const { theme, resolvedTheme, setTheme } = useTheme();

	return {
		themes: THEMES,
		theme: theme as Theme | undefined,
		resolvedTheme: resolvedTheme as Theme | undefined,
		setTheme: (theme: Theme) => setTheme(theme),
	};
};

export default useTypedTheme;
