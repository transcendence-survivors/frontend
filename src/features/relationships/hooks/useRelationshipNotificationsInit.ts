'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRelationshipNotificationsActions } from '../stores/relationshipNotificationSlice';
import { useEffect } from 'react';
import { useSocketState } from '@/modules/websocket/hooks/useSocketState';

export const useRelationshipNotificationsInit = () => {
	const queryClient = useQueryClient();
	const { socket, isConnected } = useSocketState();

	const actions = useRelationshipNotificationsActions();

	useEffect(() => {
		if (!socket || !isConnected) return;
		actions.initRelationshipNotificationListeners(queryClient);

		return () => {
			actions.destroyRelationshipNotificationListeners();
		};
	}, [actions, queryClient, socket, isConnected]);
};
