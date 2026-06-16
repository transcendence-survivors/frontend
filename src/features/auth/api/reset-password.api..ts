import { api } from '@/libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';

interface ResetPasswordRequestBody {
	token: string;
	newPassword: string;
}

const resetPassword = (body: ResetPasswordRequestBody) => {
	return api.post<void>(AUTH_ENDPOINTS.resetPassword, body);
};

export { resetPassword };
