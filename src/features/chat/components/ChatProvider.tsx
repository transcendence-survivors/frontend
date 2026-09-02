'use client';

import { useChatInit } from '../hooks/useChatInit';

export function ChatProvider({ children }: { children: React.ReactNode }) {
	useChatInit();

	return <>{children}</>;
}
