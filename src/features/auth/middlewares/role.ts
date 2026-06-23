import { RouteKey } from '@/modules/i18n/constants/routes';
import { UserRole } from '@user/schemas/user.schema';

const hierarchy: Record<UserRole, number> = {
	USER: 1,
	ADMIN: 2,
	SUPER_ADMIN: 3,
};

const roleRoutes: Partial<Record<RouteKey, UserRole[]>> = {
	settings: ['USER'],
	feed: ['USER'],
	chat: ['USER'],
	chatId: ['USER'],
	profile: ['USER'],
	profileComments: ['USER'],
	profileLikes: ['USER'],
	profileFavourites: ['USER'],
	profilePosts: ['USER'],
	friends: ['USER'],
};

const hasRequiredRole = (userRole: UserRole, required: UserRole[]): boolean =>
	required.some((r) => hierarchy[userRole] >= hierarchy[r]);

const isRoleRoute = (route: RouteKey): boolean => route in roleRoutes;

export { hasRequiredRole, isRoleRoute, roleRoutes };
