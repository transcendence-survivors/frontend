import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { useShallow } from 'zustand/react/shallow';

export const useOnlineFriends = () =>
	useWebsocketStore(
		useShallow((state) => ({
			onlineFriends: state.onlineFriends,
			onlineFriendsCount: state.onlineFriendsCount,
			isFriendOnline: state.presenceActions.isFriendOnline,
			getFriendStatus: state.presenceActions.getFriendStatus,
		})),
	);
