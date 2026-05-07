import { api, ApiResponse, isApiSuccess } from '@libs/api';
import { User } from '../schemas/user.schema';
import { AUTH_ENDPOINTS } from '../constants/endpoints';

interface RefreshResponse {
	accessToken: string;
}

const refreshAccessToken = async (): Promise<RefreshResponse> => {
	const res = await api.post<RefreshResponse>(AUTH_ENDPOINTS.refresh);
	if (!isApiSuccess(res)) throw new Error(res.message);
	return res.data;
};

const getMe = async (): Promise<User> => {
	const res = await api.get<User>(AUTH_ENDPOINTS.me);
	if (!isApiSuccess(res)) throw new Error(res.message);
	return res.data;
};

const logoutRequest = async (): Promise<void> => {
	await api.post<void>(AUTH_ENDPOINTS.logout);
};

interface LoginRequestBody {
	email: string;
	password: string;
}
const loginRequest = async (body: LoginRequestBody): Promise<ApiResponse<User>> => {
	const res = await api.post<User>(AUTH_ENDPOINTS.login, body);
	return res;
};

export { refreshAccessToken, getMe, logoutRequest, loginRequest };
