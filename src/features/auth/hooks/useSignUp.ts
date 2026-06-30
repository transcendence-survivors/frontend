import { useMutation } from '@tanstack/react-query';
import { signUp } from '../api/signUp.api';
import { toast } from 'sonner';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { REDIRECTED_URLS } from '@/modules/i18n/constants/routes';
import { useSessionActions } from '../stores/session';

interface useSignUpProps {
	successMessage: string;
}

const useSignUp = ({ successMessage }: useSignUpProps) => {
	const { setUser } = useSessionActions();
	const router = useRouter();
	return useMutation({
		mutationFn: signUp,
		onSuccess: (res) => {
			toast.success(successMessage);
			setUser({
				displayName: res.data.displayName,
				role: res.data.role,
				username: res.data.username,
				id: res.data.id,
			});
			const url = new URLSearchParams(window.location.search);
			const redirect =
				url.get(REDIRECTED_URLS.callbackKey) || REDIRECTED_URLS.profile;
			router.replace(redirect);
		},
	});
};

export default useSignUp;
