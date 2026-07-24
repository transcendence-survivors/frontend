'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { User } from '@user/type';

export type UserSession = Pick<
	User,
	'displayName' | 'role' | 'username' | 'id' | 'avatarUrl'
>;

interface SessionState {
	user: UserSession | null;
	isAuthenticated: boolean;
}

interface SessionActions {
	setUser: (u: UserSession | null) => void;
	logout: () => void;
}

type SessionStore = SessionState & SessionActions;

export const useSessionStore = create<SessionStore>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			setUser: (user) => set({ user, isAuthenticated: !!user }),
			logout: () => set({ user: null, isAuthenticated: false }),
		}),
		{
			name: 'session-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);

export const useSessionActions = () =>
	useSessionStore(
		useShallow((state) => ({
			setUser: state.setUser,
			logout: state.logout,
		})),
	);

export const useUser = () => useSessionStore((s) => s.user);
export const useIsAuthenticated = () => useSessionStore((s) => s.isAuthenticated);
