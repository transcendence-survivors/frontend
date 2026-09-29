import { StateCreator } from 'zustand';
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { FRIEND_EVENTS } from '../constants/events';
import { BaseUser } from '@/features/user/type';
import { invalidateQueries } from '@/libs/api/helpers/queryInvalidator';
import {
	FriendRequestAcceptedToast,
	FriendRequestReceivedToast,
} from '../friend-request/components/FriendRequestToasts';
import { SocketSlice } from '@/modules/websocket/stores/socketSlice';
import { useShallow } from 'zustand/react/shallow';
import { useWebsocketStore } from '@/modules/websocket/stores/rootStore';
import { PresenceSlice } from '@/features/presence/stores/presenceSlice';
import { PresenceStatus } from '@/features/presence/types/status';
import { relationshipKeys } from '../constants/keys';

interface RelationshipSliceActions {
	initRelationshipNotificationListeners: (queryClient: QueryClient) => void;
	destroyRelationshipNotificationListeners: () => void;
}

interface FriendRequestEventPayload {
	user: BaseUser;
}

export type RelationshipNotificationSlice = {
	relationshipNotificationsActions: RelationshipSliceActions;
};

export const createRelationshipNotificationsSlice: StateCreator<
	SocketSlice & PresenceSlice & RelationshipNotificationSlice,
	[],
	[],
	RelationshipNotificationSlice
> = (set, get) => {
	let onRequestReceived: ((data: FriendRequestEventPayload) => void) | null = null;
	let onRequestAccepted: ((data: FriendRequestEventPayload) => void) | null = null;

	const invalidateRelationshipStatus = (
		queryClient: QueryClient,
		username: string,
	): void => {
		invalidateQueries(queryClient, relationshipKeys.status(username), {
			mode: 'instant',
		});
	};

	const invalidateFriendRequests = (queryClient: QueryClient): void => {
		invalidateQueries(queryClient, ['friend-requests-count'], { mode: 'instant' });
		invalidateQueries(queryClient, ['friend-requests'], {
			mode: 'debounce',
			delay: 1000,
		});
	};

	const invalidateFriends = (queryClient: QueryClient): void => {
		invalidateQueries(queryClient, ['friends-count'], { mode: 'instant' });
		invalidateQueries(queryClient, ['friends'], {
			mode: 'debounce',
			delay: 1000,
		});
	};

	return {
		relationshipNotificationsActions: {
			initRelationshipNotificationListeners(queryClient) {
				const socket = get().socket;
				if (!socket) return;

				get().relationshipNotificationsActions.destroyRelationshipNotificationListeners();

				onRequestReceived = (data: FriendRequestEventPayload) => {
					invalidateRelationshipStatus(queryClient, data.user.username);
					invalidateFriendRequests(queryClient);

					if (get().status !== PresenceStatus.ONLINE) return;
					toast.custom(() => <FriendRequestReceivedToast user={data.user} />);
				};

				onRequestAccepted = (data: FriendRequestEventPayload) => {
					invalidateRelationshipStatus(queryClient, data.user.username);
					invalidateFriends(queryClient);
					invalidateFriendRequests(queryClient);

					if (get().status !== PresenceStatus.ONLINE) return;
					toast.custom(() => <FriendRequestAcceptedToast user={data.user} />);
				};

				socket.on(
					FRIEND_EVENTS.RECEIVE.NOTIFICATION_REQUEST_RECEIVED,
					onRequestReceived,
				);
				socket.on(
					FRIEND_EVENTS.RECEIVE.NOTIFICATION_REQUEST_ACCEPTED,
					onRequestAccepted,
				);
			},

			destroyRelationshipNotificationListeners() {
				const socket = get().socket;
				if (!socket) return;

				if (onRequestReceived) {
					socket.off(
						FRIEND_EVENTS.RECEIVE.NOTIFICATION_REQUEST_RECEIVED,
						onRequestReceived,
					);
					onRequestReceived = null;
				}

				if (onRequestAccepted) {
					socket.off(
						FRIEND_EVENTS.RECEIVE.NOTIFICATION_REQUEST_ACCEPTED,
						onRequestAccepted,
					);
					onRequestAccepted = null;
				}
			},
		},
	};
};

export const useRelationshipNotificationsActions = () => {
	return useWebsocketStore(
		useShallow((state) => state.relationshipNotificationsActions),
	);
};
