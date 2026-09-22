'use client';

import { useChatNotifications } from '../hooks/useChatNotifications';
import { Spinner } from '@/components/ui/spinner';
import NotificationBubble from '@/components/ui/notification-bubble';

type ChatNotificationsProps = Omit<
	React.ComponentProps<typeof NotificationBubble>,
	'count'
>;

export function ChatNotifications({ ...props }: ChatNotificationsProps) {
	const { totalUnreadCount, query } = useChatNotifications();

	if (query.isLoading) {
		return <Spinner className={'size-3.5 text-muted-foreground'} />;
	}

	if (totalUnreadCount <= 0) {
		return null;
	}

	return <NotificationBubble count={totalUnreadCount} {...props} />;
}
