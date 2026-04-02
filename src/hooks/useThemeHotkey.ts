'use client';

import { useCallback, useEffect } from 'react';
import { useTheme } from 'next-themes';

const isTypingTarget = (target: EventTarget | null) => {
	if (!(target instanceof HTMLElement)) return false;

	return (
		target.isContentEditable ||
		target.tagName === 'INPUT' ||
		target.tagName === 'TEXTAREA' ||
		target.tagName === 'SELECT'
	);
};

const useThemeHotkey = () => {
	const { theme, resolvedTheme, setTheme } = useTheme();

	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (
				event.defaultPrevented ||
				event.repeat ||
				event.metaKey ||
				event.ctrlKey ||
				event.altKey
			)
				return;

			if (event.key.toLowerCase() !== 'd') return;
			if (isTypingTarget(event.target)) return;

			const current = resolvedTheme ?? theme;

			console.log('theme:', theme, 'resolved:', resolvedTheme);
			if (!current) return;
			setTheme(current === 'dark' ? 'light' : 'dark');
		},
		[theme, resolvedTheme, setTheme],
	);

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [onKeyDown]);
};

export default useThemeHotkey;
