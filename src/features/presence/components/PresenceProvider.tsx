'use client';

import React from 'react';
import { usePresenceInit } from '../hooks/usePresenceInit';

interface PresenceProviderProps {
	children: React.ReactNode;
}

export const PresenceProvider = ({ children }: PresenceProviderProps) => {
	usePresenceInit();

	return <>{children}</>;
};

export default PresenceProvider;
