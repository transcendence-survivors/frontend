import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { REDIRECTED_URLS } from '@/modules/i18n/constants/routes';
import { signInUsernameEmail } from '../api/signIn.api';
import { useSessionActions } from '../stores/session';

interface useSignInMessages {
	successMessage: string;
}

const useSignIn = ({ successMessage }: useSignInMessages) => {
	const { setUser } = useSessionActions();
	const router = useRouter();
	return useMutation({
		mutationFn: signInUsernameEmail,
		onSuccess: (res) => {
			toast.success(successMessage);
			setUser({
				displayName: res.data.displayName,
				role: res.data.role,
				avatarUrl: res.data.avatarUrl,
				username: res.data.username,
				id: res.data.id,
			});
			const url = new URLSearchParams(window.location.search);
			const redirect =
				url.get(REDIRECTED_URLS.callbackKey) ||
				REDIRECTED_URLS.profile.replace(':username', res.data.username);
			router.replace(redirect);
		},
	});
};

export default useSignIn;
