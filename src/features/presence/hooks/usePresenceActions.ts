import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { useShallow } from 'zustand/react/shallow';

export const usePresenceActions = () =>
	useWebsocketStore(
		useShallow((state) => ({
			initPresence: state.presenceActions.initPresenceListeners,
			disconnectPresence: state.presenceActions.cleanupPresenceListeners,
			goStatus: state.presenceActions.goStatus,
		})),
	);
