import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { intlMiddleware, resolveCanonicalPath, stripLocale } from '@i18n/middleware';
import { CanonicalHref, REDIRECTED_URLS } from '@i18n/constants/routes';
import { hasRequiredRole, isPublicRoute, roleRoutes } from '@auth/middlewares/role';
import { getUserFromRequest } from '@auth/middlewares/token';

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	const intlResponse = intlMiddleware(req);
	if (intlResponse?.headers.get('location')) return intlResponse;

	const canonical = resolveCanonicalPath(stripLocale(pathname));

	if (isPublicRoute(canonical)) {
		return intlResponse ?? NextResponse.next();
	}

	const res = await getUserFromRequest(req);
	if (!res) {
		const url = new URL(REDIRECTED_URLS.loggin, req.url);
		url.searchParams.set('callbackUrl', pathname);
		return NextResponse.redirect(url);
	}
	const { user, setCookieHeaders } = res;

	const routeKey = canonical as CanonicalHref;
	const requiredRoles = roleRoutes[routeKey];
	if (requiredRoles && !hasRequiredRole(user.role, requiredRoles)) {
		return NextResponse.redirect(new URL(REDIRECTED_URLS['403'], req.url));
	}

	const response = intlResponse ?? NextResponse.next();
	setCookieHeaders.forEach((cookie) => {
		response.headers.append('Set-Cookie', cookie);
	});
	return response;
}

export const config = {
	matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
