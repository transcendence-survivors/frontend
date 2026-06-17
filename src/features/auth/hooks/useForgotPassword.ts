import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { forgotPassword } from '../api/forgot-passord.api';
import { isApiError } from '@/libs/api';

interface useForgotPasswordMessages {
	successMessage: string;
}

const useForgotPassword = ({ successMessage }: useForgotPasswordMessages) => {
	return useMutation({
		mutationFn: forgotPassword,
		onSuccess: (res) => {
			if (isApiError(res)) throw new Error(res.message);
			toast.success(successMessage);
		},
	});
};

export default useForgotPassword;
