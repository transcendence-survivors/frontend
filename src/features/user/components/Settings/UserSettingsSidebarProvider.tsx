'use client';

import { usePathname } from '@/modules/i18n/utils/navigation';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

const BREAKPOINT = 1024;

interface SettingsSidebarContextType {
	isOpen: boolean;
	toggle: () => void;
	setOpen: (open: boolean) => void;
}

const SettingsSidebarContext = createContext<SettingsSidebarContextType | null>(null);

export const useUserSettingsSidebar = () => {
	const context = useContext(SettingsSidebarContext);
	if (!context) {
		throw new Error(
			'useSettingsSidebar must be used within a SettingsSidebarProvider',
		);
	}
	return context;
};

export const UserSettingsSidebarProvider = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname();
	const [prevPathname, setPrevPathname] = useState(pathname);
	const [isOpenState, setIsOpenState] = useState(true);

	if (pathname !== prevPathname) {
		setPrevPathname(pathname);
		if (typeof window !== 'undefined' && window.innerWidth < BREAKPOINT) {
			setIsOpenState(false);
		}
	}

	const toggle = useCallback(() => {
		setIsOpenState((prev) => !prev);
	}, []);

	const setOpen = useCallback((open: boolean) => {
		setIsOpenState(open);
	}, []);

	return (
		<SettingsSidebarContext.Provider
			value={{
				isOpen: isOpenState,
				toggle,
				setOpen,
			}}>
			{children}
		</SettingsSidebarContext.Provider>
	);
};
