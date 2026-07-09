import { useEffect } from 'react';
import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { useSocketState } from '@/modules/websocket/hooks/useSocketState';

export const usePresenceInit = () => {
	const { socket, isConnected } = useSocketState();
	const { initPresenceListeners, cleanupPresenceListeners } = useWebsocketStore(
		(state) => state.presenceActions,
	);

	useEffect(() => {
		if (!socket || !isConnected) return;
		initPresenceListeners();

		return () => {
			cleanupPresenceListeners();
		};
	}, [socket, isConnected, initPresenceListeners, cleanupPresenceListeners]);
};
