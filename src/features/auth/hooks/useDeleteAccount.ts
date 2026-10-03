'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { toast } from 'sonner';
import { deleteAccount } from '../api/password.api';
import { ROUTES } from '@/modules/i18n/constants/routes';

interface UseDeleteAccountProps {
	successMessage: string;
}

export const useDeleteAccount = ({ successMessage }: UseDeleteAccountProps) => {
	const router = useRouter();

	return useMutation({
		mutationFn: deleteAccount,
		onSuccess: () => {
			toast.success(successMessage);
			router.push(ROUTES.login());
			router.refresh();
		},
	});
};
