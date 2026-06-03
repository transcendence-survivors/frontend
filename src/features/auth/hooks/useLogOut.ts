'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { logoutRequest } from '../api/auth';
import { useRouter } from '@i18n/utils/navigation';

const useLogOut = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: logoutRequest,
		onSuccess: () => {
			toast.success('Logged out successfully');
			router.push('/login');
		},
		onError: (error) => {
			toast.error('Failed to log out');
		},
	});
};

export default useLogOut;
