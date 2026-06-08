import { APP_ROUTES, CanonicalHref } from '@/modules/i18n/constants/routes';
import { UserRole } from '../schemas/user.schema';

const publicRoutes = new Set<CanonicalHref>([
	APP_ROUTES.register.en,
	APP_ROUTES.login.en,
	APP_ROUTES.home.en,
	APP_ROUTES.posts.en,
]);

const hierarchy: Record<UserRole, number> = {
	USER: 1,
	ADMIN: 2,
	SUPER_ADMIN: 3,
};

const roleRoutes: Partial<Record<CanonicalHref, UserRole[]>> = {
	// [APP_ROUTES.admin.en]: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
};

const hasRequiredRole = (userRole: UserRole, required: UserRole[]): boolean =>
	required.some((r) => hierarchy[userRole] >= hierarchy[r]);

const isPublicRoute = (path: string | null): boolean => {
	if (!path) return false;
	return publicRoutes.has(path as CanonicalHref);
};

export { hasRequiredRole, isPublicRoute, publicRoutes, roleRoutes };
