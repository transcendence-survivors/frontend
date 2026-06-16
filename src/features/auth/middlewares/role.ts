import { APP_ROUTES, CanonicalHref } from '@/modules/i18n/constants/routes';
import { UserRole } from '../schemas/user.schema';

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

const isRoleRoute = (route: CanonicalHref): boolean => route in roleRoutes;

export { hasRequiredRole, isRoleRoute, roleRoutes };
