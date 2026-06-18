import { api, ApiException, isApiError } from '@/libs/api';
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

const signUp = async (body: SignUpRequestBody) => {
	const localePreference: UserLocale = body.localePreference ?? 'EN';
	const gender: UserGender = body.gender ?? 'PREFER_NOT_TO_SAY';

	const res = await api.post<UserSession>(AUTH_ENDPOINTS.signUp, {
		...body,
		localePreference,
		gender,
	});
	if (isApiError(res)) {
		throw new ApiException(res.code, res.message);
	}
	return res;
};

const checkEmail = (email: string) => {
	return api.get<void>(`${AUTH_ENDPOINTS.checkEmail}/${email}`);
};

const checkUsername = (username: string) => {
	return api.get<void>(`${AUTH_ENDPOINTS.checkUsername}/${username}`);
};

export { signUp, checkEmail, checkUsername };
