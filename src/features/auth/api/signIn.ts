import { api, ApiResponse, isApiError } from '@/libs/api';
import { User } from '../schemas/user.schema';
import { AUTH_ENDPOINTS } from '../constants/endpoints';
import ApiException from '@/libs/api/ApiException';

interface SignInEmailRequestBody {
	email: string;
	password: string;
}

const signInEmail = async (body: SignInEmailRequestBody): Promise<ApiResponse<User>> => {
	const res = await api.post<User>(AUTH_ENDPOINTS.login, body);
	if (isApiError(res)) {
		throw new ApiException(res.code, res.message);
	}
	return res;
};

interface SignInUsernameRequestBody {
	username: string;
	password: string;
}

const signInUsername = async (
	body: SignInUsernameRequestBody,
): Promise<ApiResponse<User>> => {
	const res = await api.post<User>(AUTH_ENDPOINTS.login, body);
	if (isApiError(res)) {
		throw new ApiException(res.code, res.message);
	}
	return res;
};

export { signInEmail, signInUsername };
