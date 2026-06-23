import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';

import { env } from '@env';
import { UserRole } from '@user/schemas/user.schema';
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from '../constants/cookies';
import { AUTH_ENDPOINTS } from '../constants/endpoints';

const secret = new TextEncoder().encode(env.JWT_SECRET);
type JWTPayload = {
	sub: string;
	role: UserRole;
	exp: number;
};
const verifyToken = async (token: string): Promise<JWTPayload> => {
	const { payload } = await jwtVerify(token, secret);
	return payload as JWTPayload;
};

type RefreshResult = {
	payload: JWTPayload;
	setCookieHeaders: string[];
} | null;

type UserRequestResult = {
	user: JWTPayload;
	setCookieHeaders: string[];
} | null;

const handleAccessToken = async (req: NextRequest) => {
	const token = req.cookies.get(COOKIE_ACCESS_TOKEN)?.value;
	if (!token) return null;

	try {
		return await verifyToken(token);
	} catch {
		return null;
	}
};
const handleRefreshToken = async (req: NextRequest): Promise<RefreshResult> => {
	const token = req.cookies.get(COOKIE_REFRESH_TOKEN)?.value;
	if (!token) return null;

	try {
		const url = `${env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINTS.refresh}`;
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				Cookie: `${COOKIE_REFRESH_TOKEN}=${token}`,
			},
		});

		if (!res.ok) {
			return null;
		}

		const setCookieHeaders = res.headers.getSetCookie();
		const accessToken = setCookieHeaders
			.find((c) => c.startsWith(`${COOKIE_ACCESS_TOKEN}=`))
			?.split(';')[0]
			?.split('=')[1];
		if (!accessToken) return null;
		const payload = await verifyToken(accessToken);
		return { payload, setCookieHeaders };
	} catch {
		return null;
	}
};

const getUserFromRequest = async (req: NextRequest): Promise<UserRequestResult> => {
	console.log("access");

	const accessTokenPayload = await handleAccessToken(req);
	if (accessTokenPayload) {
		return { user: accessTokenPayload, setCookieHeaders: [] };
	}
	console.log("refreshing");
	const refreshResult = await handleRefreshToken(req);
	if (!refreshResult) return null;
	console.log("refreshed");

	return {
		user: refreshResult.payload,
		setCookieHeaders: refreshResult.setCookieHeaders,
	};
};

export { getUserFromRequest };
