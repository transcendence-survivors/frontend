import { api, ApiError } from '@/libs/api';
import { type UserFacade } from '../type';
import { USERS_ENDPOINTS } from '../constants/endpoints';

export const profileByUsername = async (username: string) => {
	try {
		return await api.get<UserFacade>(USERS_ENDPOINTS.getProfileByUsername(username));
	} catch {
		return {
			code: 404,
			message: 'User not found',
			status: 'error',
		} satisfies ApiError;
	}
};
