import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { changePassword } from '../api/password.api';

interface UseChangePasswordMessages {
	successMessage: string;
}

export const useChangePassword = ({ successMessage }: UseChangePasswordMessages) => {
	return useMutation({
		mutationFn: changePassword,
		onSuccess: () => {
			toast.success(successMessage);
		},
	});
};
