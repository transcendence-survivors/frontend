import { Endpoint } from '@/libs/api/helpers/types';

const CHAT_START_PATH = '/chat' as const;
const CHAT_ROOM_START_PATH = `${CHAT_START_PATH}/rooms` as const;

type StartPath = typeof CHAT_ROOM_START_PATH | typeof CHAT_START_PATH;

const CHAT_ENDPOINTS = {
	getRoom: (id: string) => `${CHAT_ROOM_START_PATH}/${id}`,
	getRooms: `${CHAT_ROOM_START_PATH}`,
	getRoomsCount: `${CHAT_ROOM_START_PATH}/count`,
	deleteRoom: (id: string) => `${CHAT_ROOM_START_PATH}/${id}`,
	createRoom: `${CHAT_ROOM_START_PATH}`,

	getMessages: (roomId: string) => `${CHAT_START_PATH}/${roomId}/messages`,
	getMessagesCount: (roomId: string) => `${CHAT_START_PATH}/${roomId}/messages/count`,
} as const satisfies Record<string, Endpoint<StartPath>>;

export { CHAT_ENDPOINTS };
