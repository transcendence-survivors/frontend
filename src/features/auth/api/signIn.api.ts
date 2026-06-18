import { api, isApiError } from '@/libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';
import { UserSession } from '../stores/session';
import { ApiException } from '@/libs/api/';

interface SignInUsernameRequestBody {
	usernameOrEmail: string;
	password: string;
}

const signInUsernameEmail = async (body: SignInUsernameRequestBody) => {
	const res = await api.post<UserSession>(AUTH_ENDPOINTS.login, body, {
		_retry: false,
	});
	if (isApiError(res)) {
		throw new ApiException(res.code, res.message);
	}
	return res;
};

export { signInUsernameEmail };
