import { api, ApiResponse } from '@/libs/api';
import { User } from '../schemas/user.schema';
import { AUTH_ENDPOINTS } from '../constants/endpoints';

interface SignInEmailRequestBody {
	email: string;
	password: string;
}

const signInEmail = async (body: SignInEmailRequestBody): Promise<ApiResponse<User>> => {
	const res = await api.post<User>(AUTH_ENDPOINTS.login, body, { _retry: false });
	return res;
};

interface SignInUsernameRequestBody {
	username: string;
	password: string;
}

const signInUsername = async (
	body: SignInUsernameRequestBody,
): Promise<ApiResponse<User>> => {
	const res = await api.post<User>(AUTH_ENDPOINTS.login, body, { _retry: false });
	return res;
};

export { signInEmail, signInUsername };
