import { api, ApiResponse } from '@/libs/api';
import { User } from '../schemas/user.schema';
import { AUTH_ENDPOINTS } from '../constants/endpoints';

interface LoginRequestBody {
	email: string;
	password: string;
}

const signIn = async (body: LoginRequestBody): Promise<ApiResponse<User>> => {
	const res = await api.post<User>(AUTH_ENDPOINTS.login, body);
	return res;
};

export { signIn };
