import { api, ApiResponse } from '@/libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';
import { type UserSession } from '../stores/session';

interface SignUpRequestBody {
	email: string;
	username: string;

	gender: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
	firstName: string;
	lastName: string;
	dateOfBirth: Date;

	displayName: string;
	bio?: string;

	password: string;
}

const signUp = (body: SignUpRequestBody) => {
	return api.post<UserSession>(AUTH_ENDPOINTS.signUp, body);
};

const checkEmail = (email: string): Promise<ApiResponse<void>> => {
	return api.get<void>(`${AUTH_ENDPOINTS.checkEmail}/${email}`);
};

const checkUsername = (username: string): Promise<ApiResponse<void>> => {
	return api.get<void>(`${AUTH_ENDPOINTS.checkUsername}/${username}`);
};

export { signUp, checkEmail, checkUsername };
