import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { useShallow } from 'zustand/react/shallow';

export const usePresenceState = () =>
	useWebsocketStore(
		useShallow((state) => ({
			isConnected: state.isConnected,
			globalOnlineCount: state.globalOnlineCount,
			onlineFriends: state.onlineFriends,
			onlineFriendsCount: state.onlineFriendsCount,
		})),
	);

export const usePresenceStatus = () =>
	useWebsocketStore(
		useShallow((state) => ({
			status: state.status,
		})),
	);
