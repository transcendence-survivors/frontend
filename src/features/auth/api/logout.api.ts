import { api, isApiError } from '@/libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';

const logoutRequest = async () => {
	const res = await api.post<void>(AUTH_ENDPOINTS.logout, {}, { no_retry: true });
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res;
};

export { logoutRequest };
