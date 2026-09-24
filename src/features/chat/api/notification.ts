import { api, isApiError } from '@/libs/api';
import { CHAT_ENDPOINTS } from '../constants/endpoints';

export interface UnreadCountResponse {
	totalUnreadCount: number;
}

export const getUnreadCount = async (): Promise<UnreadCountResponse> => {
	const res = await api.get<UnreadCountResponse>(
		CHAT_ENDPOINTS.notificationsUnreadCount,
	);

	if (isApiError(res)) {
		throw new Error(`Failed to fetch unread count: ${res.message}`);
	}
	return res.data;
};
