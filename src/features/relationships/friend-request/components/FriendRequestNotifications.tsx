'use client';

import NotificationBubble from '@/components/ui/notification-bubble';
import { useRequestCount } from '../hooks/useRequestCount';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/libs/utils';

type FriendRequestNotificationsProps = Omit<
	React.ComponentProps<typeof NotificationBubble>,
	'count'
>;

export function FriendRequestNotifications({
	...props
}: FriendRequestNotificationsProps) {
	const { data, isLoading } = useRequestCount({
		direction: 'incoming',
		search: '',
	});

	if (isLoading) {
		return (
			<Spinner className={cn('size-3.5 text-muted-foreground', props.className)} />
		);
	}
	const count = data?.count ?? 0;
	if (!count || count <= 0) {
		return null;
	}

	return <NotificationBubble count={count} {...props} />;
}
