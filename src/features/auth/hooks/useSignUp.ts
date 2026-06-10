import { useMutation } from '@tanstack/react-query';
import { signUp } from '../api/signUp';
import { toast } from 'sonner';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { getRoute } from '@/modules/i18n/utils/routing';
import { REDIRECTED_URLS } from '@/modules/i18n/constants/routes';

interface useSignUpProps {
	successMessage: string;
	errorMessage: string;
}

const useSignUp = ({ successMessage, errorMessage }: useSignUpProps) => {
	const router = useRouter();
	return useMutation({
		mutationFn: signUp,
		onSuccess: () => {
			toast.success(successMessage);
			const url = new URLSearchParams(window.location.search);
			const redirect = url.get(REDIRECTED_URLS.callbackKey) || getRoute('profile');
			router.replace(redirect);
		},
		onError: () => {
			toast.error(errorMessage);
		},
	});
};

export default useSignUp;
