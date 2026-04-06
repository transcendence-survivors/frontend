import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { intlMiddleware, stripLocale } from '@/libs/proxy/intl';
import { resolveCanonicalPath } from '@/libs/proxy/route';
import {
	getUserFromRequest,
	hasRequiredRole,
	isPublicRoute,
	roleRoutes,
} from '@/libs/proxy/auth';
import { LOGIN_PATH } from '@/libs/constants';
import { CanonicalHref } from './i18n/routing';

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	const intlResponse = intlMiddleware(req);
	if (intlResponse?.headers.get('location')) return intlResponse;

	const canonical = resolveCanonicalPath(stripLocale(pathname));

	if (isPublicRoute(canonical)) {
		return intlResponse ?? NextResponse.next();
	}

	const user = await getUserFromRequest(req);
	if (!user) {
		const url = new URL(LOGIN_PATH, req.url);
		url.searchParams.set('callbackUrl', pathname);
		return NextResponse.redirect(url);
	}

	const routeKey = canonical as CanonicalHref;
	const requiredRoles = roleRoutes[routeKey];
	if (requiredRoles && !hasRequiredRole(user.role, requiredRoles)) {
		return NextResponse.redirect(new URL('/403', req.url));
	}

	return intlResponse ?? NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
