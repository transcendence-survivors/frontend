import { create } from 'zustand';
import { createSocketSlice, SocketSlice } from './socketSlice';
import {
	createPresenceSlice,
	PresenceSlice,
} from '@/features/presence/stores/presenceSlice';
import { createChatSlice, ChatSlice } from '@/features/chat/stores/chatSlice';

type RootStoreState = SocketSlice & PresenceSlice & ChatSlice;

export const useWebsocketStore = create<RootStoreState>()((...a) => ({
	...createSocketSlice(...a),
	...createPresenceSlice(...a),
	...createChatSlice(...a),
}));
