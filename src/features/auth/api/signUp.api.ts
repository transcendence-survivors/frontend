import { api, ApiResponse } from '@/libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';
import { type UserSession } from '../stores/session';
import type { UserGender, UserLocale } from '@/features/user/schemas/user.schema';

interface SignUpRequestBody {
	email: string;
	username: string;

	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	gender?: UserGender;
	localePreference?: UserLocale;

	displayName: string;
	bio?: string;

	password: string;
}

const signUp = (body: SignUpRequestBody) => {
	const localePreference: UserLocale = body?.localePreference ?? 'EN';
	const gender: UserGender = body?.gender ?? 'PREFER_NOT_TO_SAY';

	return api.post<UserSession>(AUTH_ENDPOINTS.signUp, {
		...body,
		localePreference,
		gender,
	});
};

const checkEmail = (email: string): Promise<ApiResponse<void>> => {
	return api.get<void>(`${AUTH_ENDPOINTS.checkEmail}/${email}`);
};

const checkUsername = (username: string): Promise<ApiResponse<void>> => {
	return api.get<void>(`${AUTH_ENDPOINTS.checkUsername}/${username}`);
};

export { signUp, checkEmail, checkUsername };
