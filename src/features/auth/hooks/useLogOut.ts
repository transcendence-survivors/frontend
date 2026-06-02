'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { logoutRequest } from '../api/auth';

const useLogOut = (router: ReturnType<typeof useRouter>) => {
	return useMutation({
		mutationFn: logoutRequest,
		onSuccess: () => {
			router.push('/login');
			toast.success('Logged out successfully');
		},
	});
};

export default useLogOut;
