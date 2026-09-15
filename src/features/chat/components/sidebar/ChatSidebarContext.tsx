'use client';

import { usePathname } from '@/modules/i18n/utils/navigation';
import { createContext, useContext, useState, useCallback } from 'react';

const BREAKPOINT = 1024;

type SidebarKey = 'rooms' | 'members';

interface ChatSidebarsContextType {
	isOpen: (key: SidebarKey) => boolean;
	toggle: (key: SidebarKey) => void;
	setOpen: (key: SidebarKey, open: boolean) => void;
}

const ChatSidebarsContext = createContext<ChatSidebarsContextType | null>(null);

const useChatSidebars = () => {
	const context = useContext(ChatSidebarsContext);
	if (!context) {
		throw new Error('useChatSidebars must be used within a ChatSidebarsProvider');
	}
	return context;
};

export const useRoomsSidebar = () => {
	const { isOpen, toggle, setOpen } = useChatSidebars();
	return {
		isOpen: isOpen('rooms'),
		toggle: () => toggle('rooms'),
		setOpen: (open: boolean) => setOpen('rooms', open),
	};
};

export const useMembersSidebar = () => {
	const { isOpen, toggle, setOpen } = useChatSidebars();
	return {
		isOpen: isOpen('members'),
		toggle: () => toggle('members'),
		setOpen: (open: boolean) => setOpen('members', open),
	};
};

export const ChatSidebarsProvider = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const [prevPathname, setPrevPathname] = useState(pathname);
	const [states, setStates] = useState<Record<SidebarKey, boolean>>({
		rooms: true,
		members: false,
	});

	if (pathname !== prevPathname) {
		setPrevPathname(pathname);
		if (typeof window !== 'undefined' && window.innerWidth < BREAKPOINT) {
			setStates({ rooms: false, members: false });
		}
	}

	const isOpen = useCallback((key: SidebarKey) => states[key], [states]);

	const toggle = useCallback((key: SidebarKey) => {
		setStates((prev) => ({ ...prev, [key]: !prev[key] }));
	}, []);

	const setOpen = useCallback((key: SidebarKey, open: boolean) => {
		setStates((prev) => ({ ...prev, [key]: open }));
	}, []);

	return (
		<ChatSidebarsContext.Provider value={{ isOpen, toggle, setOpen }}>
			{children}
		</ChatSidebarsContext.Provider>
	);
};
