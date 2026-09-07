'use client';

import { createContext, useContext, useState } from 'react';

interface ChatSidebarContextType {
	isOpen: boolean;
	toggle: () => void;
}

const ChatSidebarContext = createContext<ChatSidebarContextType>({
	isOpen: false,
	toggle: () => {},
});

interface ChatSidebarProviderProps {
	children: React.ReactNode;
}

export const useChatSidebar = () => {
	const context = useContext(ChatSidebarContext);
	if (!context) {
		throw new Error('useChatSidebar must be used within a ChatSidebarProvider');
	}
	return context;
};

export const ChatSidebarProvider = ({ children }: ChatSidebarProviderProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen((prev) => !prev);

	return (
		<ChatSidebarContext.Provider value={{ isOpen, toggle }}>
			{children}
		</ChatSidebarContext.Provider>
	);
};
