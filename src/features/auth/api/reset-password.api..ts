import { api, ApiException, isApiError } from '@/libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';

interface ResetPasswordRequestBody {
	token: string;
	newPassword: string;
}

const resetPassword = async (body: ResetPasswordRequestBody) => {
	const res = await api.post<void>(AUTH_ENDPOINTS.resetPassword, body);
	if (isApiError(res)) {
		throw new ApiException(res.code, res.message);
	}
	return res;
};

export { resetPassword };
