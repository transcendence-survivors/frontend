import { api, ApiException, isApiError } from '@/libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';

interface ForgotPasswordRequestBody {
	email: string;
}

const forgotPassword = async (body: ForgotPasswordRequestBody) => {
	const res = await api.post<void>(AUTH_ENDPOINTS.forgotPassword, body, {
		no_retry: true,
	});
	if (isApiError(res)) {
		throw new ApiException(res.code, res.message);
	}
	return res;
};

export { forgotPassword };
