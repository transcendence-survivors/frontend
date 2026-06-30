// hooks/useSocketInit.ts
import { useEffect } from 'react';
import { usePresenceActions } from '../stores/presence';

export const useSocketInit = (isAuthenticated: boolean) => {
	const { initPresence, disconnectPresence } = usePresenceActions();

	useEffect(() => {
		if (isAuthenticated) {
			initPresence();
		}

		return () => {
			disconnectPresence();
		};
	}, [isAuthenticated, initPresence, disconnectPresence]);
};
