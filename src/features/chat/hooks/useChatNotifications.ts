import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNotificationActions, useTotalUnreadCount } from '../stores/notificationSlice';
import { getUnreadCount, UnreadCountResponse } from '../api/notification';

export function useChatNotifications() {
	const totalUnreadCount = useTotalUnreadCount();
	const { setUnreadSummary } = useNotificationActions();

	const query = useQuery<UnreadCountResponse>({
		queryKey: ['chat-notifications', 'unread-count'],
		queryFn: getUnreadCount,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: true,
	});

	useEffect(() => {
		if (query.data) {
			setUnreadSummary(query.data.totalUnreadCount);
		}
	}, [query.data, setUnreadSummary]);

	return {
		totalUnreadCount,
		query,
	};
}
