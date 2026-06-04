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

export default signUp;
