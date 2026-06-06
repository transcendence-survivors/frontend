import { api, ApiResponse, isApiError } from '@/libs/api';
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

const signUp = async (body: SignUpRequestBody): Promise<ApiResponse<User>> => {
	const res = await api.post<User>(AUTH_ENDPOINTS.signUp, body);
	if (isApiError(res)) {
		throw new ApiException(res.code, res.message);
	}
	return res;
};

const checkEmailUsername = async (
	email: string,
	username: string,
): Promise<ApiResponse<void>> => {
	await new Promise((resolve) => setTimeout(resolve, 5000));
	return api.get<void>(
		`${AUTH_ENDPOINTS.checkEmailUsername}?email=${email}&username=${username}`,
	);
};

export { signUp, checkEmailUsername };
