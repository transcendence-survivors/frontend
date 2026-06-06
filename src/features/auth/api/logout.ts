import { api } from '@/libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';

const logoutRequest = async (): Promise<void> => {
	await api.post<void>(AUTH_ENDPOINTS.logout);
};

export { logoutRequest };
