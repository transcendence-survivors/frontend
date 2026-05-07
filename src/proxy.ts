import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getUserFromRequest, hasRequiredRole, isPublicRoute, roleRoutes } from '@auth';
import {
	REDIRECTED_URLS,
	intlMiddleware,
	stripLocale,
	resolveCanonicalPath,
	type CanonicalHref,
} from '@i18n';

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
		const url = new URL(REDIRECTED_URLS.loggin, req.url);
		url.searchParams.set('callbackUrl', pathname);
		return NextResponse.redirect(url);
	}

	const routeKey = canonical as CanonicalHref;
	const requiredRoles = roleRoutes[routeKey];
	if (requiredRoles && !hasRequiredRole(user.role, requiredRoles)) {
		return NextResponse.redirect(new URL(REDIRECTED_URLS['403'], req.url));
	}

	return intlResponse ?? NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
