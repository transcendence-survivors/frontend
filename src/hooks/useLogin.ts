import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { loginRequest } from '@/libs/api/auth';
import { useSessionActions } from '@/libs/stores/session';
import { isApiError } from '@/libs/api';
import { authRedirectRoute } from '@/i18n/routing';

export function useLogin() {
	const router = useRouter();
	const { setSession } = useSessionActions();

	return useMutation({
		mutationFn: loginRequest,
		onSuccess: (res) => {
			if (isApiError(res)) {
				console.error('Login error:', res.message);
				return;
			}
			const { data: user } = res;
			setSession({ user: user, accessToken: '' });
			router.replace(authRedirectRoute);
		},

		onError: (error) => {
			console.error('Login failed:', error);
		},
	});
}
