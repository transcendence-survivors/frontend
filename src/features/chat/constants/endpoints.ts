import { Endpoint } from '@/libs/api/helpers/types';

const CHAT_START_PATH = '/chat' as const;
const CHAT_ROOM_START_PATH = `${CHAT_START_PATH}/rooms` as const;

type StartPath = typeof CHAT_ROOM_START_PATH | typeof CHAT_START_PATH;

const CHAT_ENDPOINTS = {
	getRoom: (id: string) => `${CHAT_ROOM_START_PATH}/${id}`,
	getRooms: `${CHAT_ROOM_START_PATH}`,
	getRoomsCount: `${CHAT_ROOM_START_PATH}/count`,
	patchRoom: (id: string) => `${CHAT_ROOM_START_PATH}/${id}`,
	deleteRoom: (id: string) => `${CHAT_ROOM_START_PATH}/${id}`,
	createRoom: `${CHAT_ROOM_START_PATH}`,

	getMessages: (roomId: string) => `${CHAT_START_PATH}/${roomId}/messages`,
	getMessagesCount: (roomId: string) => `${CHAT_START_PATH}/${roomId}/messages/count`,

	getMembers: (roomId: string) => `${CHAT_START_PATH}/${roomId}/members`,
	getMembersCount: (roomId: string) => `${CHAT_START_PATH}/${roomId}/members/count`,
	kickMember: (roomId: string, targetUserId: string) =>
		`/chat/${roomId}/members/${targetUserId}`,
	updateMemberRole: (roomId: string, targetUserId: string) =>
		`/chat/${roomId}/members/${targetUserId}/role`,
	transferOwnership: (roomId: string) => `/chat/${roomId}/members/transfer-ownership`,
	leaveRoom: (roomId: string) => `/chat/${roomId}/leave`,
} as const satisfies Record<string, Endpoint<StartPath>>;

export { CHAT_ENDPOINTS };
