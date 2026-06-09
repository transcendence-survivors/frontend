import { useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

type UseMediaQueryOptions = {
	defaultValue?: boolean;
	initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === 'undefined';

export const useMediaQuery = (
	query: string,
	{ defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions,
) => {
	const getMatches = (query: string): boolean => {
		if (IS_SERVER) {
			return defaultValue;
		}
		return window.matchMedia(query).matches;
	};

	const [matches, setMatches] = useState<boolean>(() => {
		if (initializeWithValue) {
			return getMatches(query);
		}
		return defaultValue;
	});

	const handleChange = () => {
		setMatches(getMatches(query));
	};

	useIsomorphicLayoutEffect(() => {
		const matchMedia = window.matchMedia(query);
		handleChange();

		// Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
		if (matchMedia.addListener) {
			matchMedia.addListener(handleChange);
		} else {
			matchMedia.addEventListener('change', handleChange);
		}

		return () => {
			if (matchMedia.removeListener) {
				matchMedia.removeListener(handleChange);
			} else {
				matchMedia.removeEventListener('change', handleChange);
			}
		};
	}, [query]);

	return matches;
};
