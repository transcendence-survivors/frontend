import { api } from '@/libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';
import { User } from '@/features/user/schemas/user.schema';

type MeResponse = Pick<User, 'id' | 'username' | 'email' | 'avatarUrl' | 'role'>;

const me = async () => {
	return api.get<MeResponse>(AUTH_ENDPOINTS.me);
};

export { me };
