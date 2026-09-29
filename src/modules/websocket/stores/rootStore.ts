import { create } from 'zustand';
import { createSocketSlice, SocketSlice } from './socketSlice';
import {
	createPresenceSlice,
	PresenceSlice,
} from '@/features/presence/stores/presenceSlice';
import { createMessageSlice, MessageSlice } from '@/features/chat/stores/messageSlice';
import { createTypingSlice, TypingSlice } from '@/features/chat/stores/typingSlice';
import { createRoomSlice, RoomSlice } from '@/features/chat/stores/roomSlice';
import {
	createChatNotificationSlice,
	ChatNotificationSlice,
} from '@/features/chat/stores/chatNotificationSlice';
import {
	createRelationshipNotificationsSlice,
	RelationshipNotificationSlice,
} from '@/features/relationships/stores/relationshipNotificationSlice';

type RootStoreState = SocketSlice &
	PresenceSlice &
	MessageSlice &
	TypingSlice &
	RoomSlice &
	ChatNotificationSlice &
	RelationshipNotificationSlice;

export const useWebsocketStore = create<RootStoreState>()((...a) => ({
	...createSocketSlice(...a),
	...createPresenceSlice(...a),
	...createRelationshipNotificationsSlice(...a),
	...createMessageSlice(...a),
	...createTypingSlice(...a),
	...createRoomSlice(...a),
	...createChatNotificationSlice(...a),
}));
