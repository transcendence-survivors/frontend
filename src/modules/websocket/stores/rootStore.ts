import { create } from 'zustand';
import { createSocketSlice, SocketSlice } from './socketSlice';
import {
	createPresenceSlice,
	PresenceSlice,
} from '@/features/presence/stores/presenceSlice';
import { createMessageSlice, MessageSlice } from '@/features/chat/stores/messageSlice';
import { createTypingSlice, TypingSlice } from '@/features/chat/stores/typingSlice';
import { createRoomSlice, RoomSlice } from '@/features/chat/stores/roomSlice';

type RootStoreState = SocketSlice &
	PresenceSlice &
	MessageSlice &
	TypingSlice &
	RoomSlice;

export const useWebsocketStore = create<RootStoreState>()((...a) => ({
	...createSocketSlice(...a),
	...createPresenceSlice(...a),
	...createMessageSlice(...a),
	...createTypingSlice(...a),
	...createRoomSlice(...a),
}));
