import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { forgotPassword } from '../api/password.api';

interface useForgotPasswordMessages {
	successMessage: string;
}

const useForgotPassword = ({ successMessage }: useForgotPasswordMessages) => {
	return useMutation({
		mutationFn: forgotPassword,
		onSuccess: () => {
			toast.success(successMessage);
		},
	});
};

export default useForgotPassword;
