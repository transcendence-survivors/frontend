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
			setUser: (user) => set({ user }),
			logout: () => set({ user: null }),
		}),
		{
			name: 'session-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ user: state.user }),
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
