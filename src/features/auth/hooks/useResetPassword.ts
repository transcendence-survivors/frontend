import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { resetPassword } from '../api/reset-password.api.';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { REDIRECTED_URLS } from '@/modules/i18n/constants/routes';

interface useResetPasswordMessages {
	successMessage: string;
}

const useResetPassword = ({ successMessage }: useResetPasswordMessages) => {
	const router = useRouter();
	return useMutation({
		mutationFn: resetPassword,
		onSuccess: () => {
			toast.success(successMessage);
			router.push(REDIRECTED_URLS.login);
		},
	});
};

export default useResetPassword;
