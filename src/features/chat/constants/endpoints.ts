const CHAT_START_PATH = '/chat/rooms' as const;

type StartPath = typeof CHAT_START_PATH;
type ChatEndpoint = `${StartPath}/${string}` | `${StartPath}`;

const CHAT_ENDPOINTS = {
	getRooms: `${CHAT_START_PATH}`,
	getRoomsCount: `${CHAT_START_PATH}/count`,
	deleteRoom: `${CHAT_START_PATH}`,
	createRoom: `${CHAT_START_PATH}`,
} as const satisfies Record<string, ChatEndpoint>;

export { CHAT_ENDPOINTS };
