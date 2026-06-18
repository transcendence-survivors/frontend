import { api, ApiError } from '@/libs/api';
import { User } from '../schemas/user.schema';

const getUserByUsername = async (username: string) => {
	await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay for testing purposes
	try {
		return await api.get<User>(`/users/${username}`);
	} catch {
		return {
			code: 500,
			message: 'User not found',
			status: 'error',
		} satisfies ApiError;
	}
};

export default getUserByUsername;
