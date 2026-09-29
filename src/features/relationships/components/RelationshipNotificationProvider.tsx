'use client';

import { useRelationshipNotificationsInit } from '../hooks/useRelationshipNotificationsInit';

interface RelationshipNotificationProviderProps {
	children: React.ReactNode;
}

export const RelationshipNotificationProvider = ({
	children,
}: RelationshipNotificationProviderProps) => {
	useRelationshipNotificationsInit();

	return <>{children}</>;
};
