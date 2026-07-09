import { useShallow } from 'zustand/react/shallow';
import { useWebsocketStore } from '../stores/rootStore';

export const useSocketActions = () =>
	useWebsocketStore(
		useShallow((state) => ({
			connectSocket: state.socketActions.connectSocket,
			disconnectSocket: state.socketActions.disconnectSocket,
		})),
	);
