import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../api/me';

export const useUserSettings = () => {
	return useQuery({
		queryKey: ['me', 'settings'],
		queryFn: getSettings,
	});
};
