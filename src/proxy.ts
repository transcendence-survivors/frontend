import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { intlMiddleware, resolveRouteKeyPath, stripLocale } from '@i18n/middleware';
import { REDIRECTED_URLS } from '@i18n/constants/routes';
import { hasRequiredRole, isRoleRoute, roleRoutes } from '@auth/middlewares/role';
import { getUserFromRequest } from '@auth/middlewares/token';
import { COOKIE_REFRESH_TOKEN } from './features/auth/constants/cookies';

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const intlResponse = intlMiddleware(req);
	if (intlResponse?.headers.get('location')) return intlResponse;

	const canonical = resolveRouteKeyPath(stripLocale(pathname));
	if (!canonical || !isRoleRoute(canonical)) {
		return intlResponse ?? NextResponse.next();
	}

	const res = await getUserFromRequest(req);
	if (!res) {
		const url = new URL(REDIRECTED_URLS.login, req.url);
		url.searchParams.set(REDIRECTED_URLS.callbackKey, pathname);
		const response = NextResponse.redirect(url);
		response.cookies.delete(COOKIE_REFRESH_TOKEN);
		return response;
	}

	const { user, setCookieHeaders } = res;
	const requiredRoles = roleRoutes[canonical];
	if (requiredRoles && !hasRequiredRole(user.role, requiredRoles)) {
		return NextResponse.redirect(new URL(REDIRECTED_URLS['401'], req.url));
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
