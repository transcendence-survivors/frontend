import { api, ApiResponse, ApiSuccess, isApiError } from '@/libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';
import { User } from '../schemas/user.schema';
import ApiException from '@/libs/api/ApiException';

interface SignUpRequestBody {
	email: string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	displayName: string;
}

const signUp = async (body: SignUpRequestBody): Promise<ApiSuccess<User>> => {
	const res = await api.post<User>(AUTH_ENDPOINTS.signUp, body);
	if (isApiError(res)) {
		throw new ApiException(res.code, res.message);
	}
	return res;
};

const checkEmail = async (email: string): Promise<ApiResponse<void>> => {
	return api.get<void>(`${AUTH_ENDPOINTS.checkEmail}/${email}`);
};

const checkUsername = async (username: string): Promise<ApiResponse<void>> => {
	return api.get<void>(`${AUTH_ENDPOINTS.checkUsername}/${username}`);
};

export { signUp, checkEmail, checkUsername };
