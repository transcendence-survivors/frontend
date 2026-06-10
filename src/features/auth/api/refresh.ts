import { api, isApiError } from '@libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';
import { ApiError } from 'next/dist/server/api-utils';

const refreshAccessToken = async () => {
	const res = await api.post<void>(AUTH_ENDPOINTS.refresh, { _retry: true });
	if (isApiError(res)) {
		throw new ApiError(res.code, res.message);
	}
};

export { refreshAccessToken };
