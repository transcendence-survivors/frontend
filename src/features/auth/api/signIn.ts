import { api, ApiResponse } from '@/libs/api';
import { User } from '../schemas/user.schema';
import { AUTH_ENDPOINTS } from '../constants/endpoints';

interface SignInUsernameRequestBody {
	usernameOrEmail: string;
	password: string;
}

const signInUsernameEmail = async (
	body: SignInUsernameRequestBody,
): Promise<ApiResponse<User>> => {
	const res = await api.post<User>(AUTH_ENDPOINTS.login, body, { _retry: false });
	return res;
};

export { signInUsernameEmail };
