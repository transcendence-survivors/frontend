import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

export const useIsMounted = (): boolean => {
	return useSyncExternalStore(
		noopSubscribe,
		() => true,
		() => false,
	);
};
