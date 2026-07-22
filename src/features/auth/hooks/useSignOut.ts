'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { logoutRequest } from '../api/logout.api';
import { useRouter } from '@i18n/utils/navigation';
import { useSessionActions } from '../stores/session';
import { ROUTES } from '@/modules/i18n/constants/routes';

interface useSignOutProps {
	successMessage: string;
}

const useSignOut = ({ successMessage }: useSignOutProps) => {
	const router = useRouter();
	const { logout } = useSessionActions();

	return useMutation({
		mutationFn: logoutRequest,
		onSuccess: () => {
			logout();
			toast.success(successMessage);
			router.push(ROUTES.login());
		},
		onError: () => {
			logout();
			router.push(ROUTES.login());
		},
	});
};

export default useSignOut;
