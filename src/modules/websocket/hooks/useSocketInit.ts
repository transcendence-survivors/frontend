import { useEffect } from 'react';
import { useIsAuthenticated } from '@/features/auth/stores/session';
import { useSocketActions } from './useSocketActions';

export const useSocketInit = () => {
	const isAuthenticated = useIsAuthenticated();
	const { connectSocket, disconnectSocket } = useSocketActions();

	useEffect(() => {
		if (isAuthenticated) connectSocket();
		else disconnectSocket();

		return () => {
			disconnectSocket();
		};
	}, [isAuthenticated, connectSocket, disconnectSocket]);
};
