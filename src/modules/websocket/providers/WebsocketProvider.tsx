'use client';

import { useSocketInit } from '../hooks/useSocketInit';

interface WebsocketProviderProps {
	children: React.ReactNode;
}

const WebsocketProvider = ({ children }: WebsocketProviderProps) => {
	useSocketInit();

	return <>{children}</>;
};

export default WebsocketProvider;
