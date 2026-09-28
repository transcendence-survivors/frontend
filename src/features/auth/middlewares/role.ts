import { RouteKey } from '@/modules/i18n/constants/routes';
import { UserRole } from '@user/type';

const hierarchy = {
	USER: 1,
	ADMIN: 2,
	SUPER_ADMIN: 3,
} as const satisfies Record<UserRole, number>;

const roleRoutes = {
	feed: ['USER'],

	search: ['USER'],

	friends: ['USER'],
	blocked: ['USER'],
	friendsRequests: ['USER'],

	chat: ['USER'],
	chatId: ['USER'],

	settings: ['USER'],
	userName: ['USER'],
	userNamePosts: ['USER'],
	userNamePostsId: ['USER'],
	userNameComments: ['USER'],
	userNameLikes: ['USER'],
	userNameReposts: ['USER'],
} as const satisfies Partial<Record<RouteKey, UserRole[]>>;

const hasRequiredRole = (userRole: UserRole, required: UserRole[]): boolean =>
	required.some((r) => hierarchy[userRole] >= hierarchy[r]);

const isRoleRoute = (route: RouteKey): route is keyof typeof roleRoutes =>
	route in roleRoutes;

export { hasRequiredRole, isRoleRoute, roleRoutes };
