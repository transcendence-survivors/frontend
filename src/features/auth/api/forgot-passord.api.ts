import { api } from '@/libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';

interface ForgotPasswordRequestBody {
	email: string;
}

const forgotPassword = (body: ForgotPasswordRequestBody) => {
	return api.post<void>(AUTH_ENDPOINTS.forgotPassword, body);
};

export { forgotPassword };
