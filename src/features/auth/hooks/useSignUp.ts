import { useMutation } from '@tanstack/react-query';
import signUp from '../api/signUp';
import { toast } from 'sonner';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { getRoute } from '@/modules/i18n/utils/routing';
import ApiException from '@/libs/api/ApiException';

const useSignUp = () => {
	const router = useRouter();
	return useMutation({
		mutationFn: signUp,
		onSuccess: () => {
			toast.success('Sign up successful! Welcome aboard!');
			router.push(getRoute('profile'));
		},
		onError: (error: unknown) => {
			if (error instanceof ApiException) {
				toast.error(`Sign up failed: ${error.message}`);
				return;
			}
			if (error instanceof Error) {
				toast.error(`Sign up failed: ${error.message}`);
				return;
			}
			const message = 'An error occurred during sign up. Please try again.';
			toast.error(message);
		},
	});
};

export default useSignUp;
