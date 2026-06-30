'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { logoutRequest } from '../api/logout.api';
import { useRouter } from '@i18n/utils/navigation';
import { useSessionActions } from '../stores/session';

interface useSignOutProps {
	successMessage: string;
	errorMessage: string;
}

const useSignOut = ({ successMessage, errorMessage }: useSignOutProps) => {
	const router = useRouter();
	const { logout } = useSessionActions();

	return useMutation({
		mutationFn: logoutRequest,
		onSuccess: () => {
			logout();
			toast.success(successMessage);
			router.push('/login');
		},
		onError: () => {
			toast.error(errorMessage);
		},
	});
};

export default useSignOut;
