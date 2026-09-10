import { api, ApiError, buildUrlParams, CursorResponse, isApiError } from '@/libs/api';
import { CHAT_ENDPOINTS } from '../constants/endpoints';
import { ChatRoom, ChatRoomType, GetChatRoomSearchParams } from '../types/room';
import { uploadAttachments } from '@/libs/api/helpers/attachments';
import { ChatMemberRole } from '../types/member';

interface ChatRoomCreatePayload {
	type: ChatRoomType;
	name?: string;
	usersIds: string[];
}

type GetChatRooms = CursorResponse<ChatRoom[]>;

export const getChatRooms = async (params: GetChatRoomSearchParams) => {
	const urlParams = buildUrlParams(params);
	if (params.type) urlParams.append('type', params.type);

	const response = await api.get<GetChatRooms>(
		`${CHAT_ENDPOINTS.getRooms}?${urlParams}`,
	);
	if (isApiError(response))
		throw new Error(`Failed to fetch chat rooms: ${response.message}`);
	return response.data;
};

export const getChatRoom = async (id: string, cookie: string) => {
	try {
		return await api.get<ChatRoom & { currentUserRole: ChatMemberRole }>(
			CHAT_ENDPOINTS.getRoom(id),
			{
				headers: {
					Cookie: cookie,
				},
			},
		);
	} catch {
		return {
			status: 'error',
			message: 'Failed to fetch chat room',
			code: 500,
		} satisfies ApiError;
	}
};

export const createChatRoom = async (payload: ChatRoomCreatePayload) => {
	return await api.post<ChatRoom>(CHAT_ENDPOINTS.createRoom, payload);
};

export const deleteRoom = async (roomId: string) => {
	return await api.delete<void>(CHAT_ENDPOINTS.deleteRoom(roomId));
};

export interface ChatRoomPatchPayload {
	name?: string | null;
	file?: File;
	removeAvatar?: boolean;
}

export const patchChatRoom = async (
	roomId: string,
	{ name, file, removeAvatar }: ChatRoomPatchPayload,
) => {
	const payload: { name?: string | null; avatarUrl?: string | null } = {};

	if (name !== undefined) {
		payload.name = name && name.trim().length > 0 ? name.trim() : null;
	}

	if (removeAvatar) {
		payload.avatarUrl = null;
	} else if (file) {
		const [uploadedUrl] = await uploadAttachments([file]);
		payload.avatarUrl = uploadedUrl;
	}

	const res = await api.patch<void>(CHAT_ENDPOINTS.patchRoom(roomId), payload);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
};
