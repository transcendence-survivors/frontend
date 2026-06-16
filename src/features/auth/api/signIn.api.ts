import { api } from '@/libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';
import { UserSession } from '../stores/session';

interface SignInUsernameRequestBody {
	usernameOrEmail: string;
	password: string;
}

const signInUsernameEmail = (body: SignInUsernameRequestBody) => {
	return api.post<UserSession>(AUTH_ENDPOINTS.login, body, { _retry: false });
};

export { signInUsernameEmail };
