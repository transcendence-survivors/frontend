import { api, ApiError } from '@/libs/api';
import { type UserFacade } from '../type';
import { USERS_ENDPOINTS } from '../constants/endpoints';

const getUserByUsername = async (username: string) => {
	try {
		const url = `${USERS_ENDPOINTS.getUserByUsername.replace(':username', username)}`;
		return await api.get<UserFacade>(url);
	} catch {
		return {
			code: 500,
			message: 'User not found',
			status: 'error',
		} satisfies ApiError;
	}
};

export default getUserByUsername;
