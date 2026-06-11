import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { REDIRECTED_URLS } from '@/modules/i18n/constants/routes';
import { signInUsernameEmail } from '../api/signIn';

interface useSignInMessages {
	successMessage: string;
}

const useSignIn = ({ successMessage }: useSignInMessages) => {
	const router = useRouter();
	return useMutation({
		mutationFn: signInUsernameEmail,
		onSuccess: () => {
			toast.success(successMessage);
			const url = new URLSearchParams(window.location.search);
			const redirect =
				url.get(REDIRECTED_URLS.callbackKey) || REDIRECTED_URLS.profile;
			router.replace(redirect);
		},
	});
};

export default useSignIn;
