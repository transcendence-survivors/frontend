import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { useShallow } from 'zustand/react/shallow';

export const useWsChatActions = () =>
	useWebsocketStore(
		useShallow((state) => ({
			initChatListeners: state.chatActions.initChatListeners,
			sendMessage: state.chatActions.sendMessage,
		})),
	);
