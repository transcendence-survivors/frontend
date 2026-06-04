import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

import { UserRole } from './schemas/user.schema';
import {
	COOKIE_ACCESS_TOKEN,
	COOKIE_AUTHORIZATION,
	TOKEN_PREFIX,
} from './constants/cookies';
import { env } from '@env';
import { APP_ROUTES, CanonicalHref } from '@/modules/i18n/constants/routes';

type JWTPayload = {
	sub: string;
	role: UserRole;
	exp: number;
};
const secret = new TextEncoder().encode(env.JWT_SECRET);

const verifyToken = async (token: string): Promise<JWTPayload> => {
	const { payload } = await jwtVerify(token, secret);
	return payload as JWTPayload;
};

const publicRoutes = new Set<CanonicalHref>([
	APP_ROUTES.register.en,
	APP_ROUTES.login.en,
	APP_ROUTES.home.en,
	APP_ROUTES.posts.en,
	APP_ROUTES.profile.en,
]);

const roleRoutes: Partial<Record<CanonicalHref, UserRole[]>> = {
	// [APP_ROUTES.admin.en]: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
};

const hierarchy: Record<UserRole, number> = {
	USER: 1,
	ADMIN: 2,
	SUPER_ADMIN: 3,
};

const hasRequiredRole = (userRole: UserRole, required: UserRole[]): boolean =>
	required.some((r) => hierarchy[userRole] >= hierarchy[r]);

const getUserFromRequest = async (req: NextRequest) => {
	const token =
		req.cookies.get(COOKIE_ACCESS_TOKEN)?.value ||
		req.headers.get(COOKIE_AUTHORIZATION)?.replace(TOKEN_PREFIX, '');

	if (!token) return null;

	try {
		return await verifyToken(token);
	} catch {
		return null;
	}
};

const isPublicRoute = (path: string | null): boolean => {
	if (!path) return false;
	return publicRoutes.has(path as CanonicalHref);
};

export { getUserFromRequest, hasRequiredRole, isPublicRoute, roleRoutes };
