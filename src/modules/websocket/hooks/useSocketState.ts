import { useShallow } from 'zustand/react/shallow';
import { useWebsocketStore } from '../stores/rootStore';

export const useSocketState = () =>
	useWebsocketStore(
		useShallow((state) => ({
			socket: state.socket,
			isConnected: state.isConnected,
		})),
	);
