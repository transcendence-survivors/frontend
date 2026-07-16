import { Endpoint } from '@/libs/api/helpers/types';

const CHAT_START_PATH = '/chat/rooms' as const;

type StartPath = typeof CHAT_START_PATH;

const CHAT_ENDPOINTS = {
	getRooms: `${CHAT_START_PATH}`,
	getRoomsCount: `${CHAT_START_PATH}/count`,
	deleteRoom: (id: string) => `${CHAT_START_PATH}/${id}`,
	createRoom: `${CHAT_START_PATH}`,
} as const satisfies Record<string, Endpoint<StartPath>>;

export { CHAT_ENDPOINTS };
