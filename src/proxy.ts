import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { intlMiddleware } from '@i18n/middleware';
import { hasRequiredRole, isRoleRoute, roleRoutes } from '@auth/middlewares/role';
import { getUserFromRequest } from '@auth/middlewares/token';
import {
	COOKIE_ACCESS_TOKEN,
	COOKIE_REFRESH_TOKEN,
} from './features/auth/constants/cookies';
import { resolveRouteKeyPath, stripLocale } from './modules/i18n/utils/resolve';
import { CALLBACK_KEY, ROUTES } from './modules/i18n/constants/routes';

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
		const url = new URL(ROUTES.login(), req.url);
		url.searchParams.set(CALLBACK_KEY, pathname);
		const response = NextResponse.redirect(url);
		response.cookies.delete(COOKIE_REFRESH_TOKEN);
		return response;
	}

	const { user, setCookieHeaders } = res;
	const requiredRoles = roleRoutes[canonical];
	if (requiredRoles && !hasRequiredRole(user.role, requiredRoles)) {
		return NextResponse.redirect(new URL(ROUTES.login(), req.url));
	}

	if (setCookieHeaders.length > 0) {
		const newAccessToken = setCookieHeaders
			.find((c) => c.startsWith(`${COOKIE_ACCESS_TOKEN}=`))
			?.split(';')[0]
			?.split('=')[1];

		if (newAccessToken) {
			req.cookies.set(COOKIE_ACCESS_TOKEN, newAccessToken);
		}
	}

	const response =
		intlResponse ??
		NextResponse.next({
			request: {
				headers: req.headers,
			},
		});

	if (setCookieHeaders.length > 0) {
		setCookieHeaders.forEach((cookie) => {
			response.headers.append('Set-Cookie', cookie);
		});
		response.headers.set('x-middleware-request-cookie', req.cookies.toString());
	}

	return response;
}

export const config = {
	matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
