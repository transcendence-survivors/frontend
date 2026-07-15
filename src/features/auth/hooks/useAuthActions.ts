'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { CALLBACK_KEY, ROUTES } from '@/modules/i18n/constants/routes';
import { useSessionActions } from '../stores/session';
import { signUp } from '../api/signUp.api';
import { signInUsernameEmail } from '../api/signIn.api';
import { stripLocale } from '@/modules/i18n/utils/resolve';

const authActionFns = {
	signUp: signUp,
	signIn: signInUsernameEmail,
} as const;

type AuthAction = keyof typeof authActionFns;

interface UseAuthActionParams<TAction extends AuthAction> {
	action: TAction;
	successMessage: string;
}

const useAuthAction = <TAction extends AuthAction>({
	action,
	successMessage,
}: UseAuthActionParams<TAction>) => {
	const { setUser } = useSessionActions();
	const router = useRouter();

	const mutationFn = authActionFns[action] as (
		variables: Parameters<(typeof authActionFns)[TAction]>[0],
	) => ReturnType<(typeof authActionFns)[TAction]>;

	return useMutation({
		mutationKey: ['auth', action],
		mutationFn: mutationFn,
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
			const callbackUrl = url.get(CALLBACK_KEY);
			router.replace(
				callbackUrl
					? stripLocale(callbackUrl)
					: ROUTES.userName({ username: res.data.username }),
			);
		},
	});
};

export const useSignUp = (params: Omit<UseAuthActionParams<'signUp'>, 'action'>) =>
	useAuthAction({ ...params, action: 'signUp' });

export const useSignIn = (params: Omit<UseAuthActionParams<'signIn'>, 'action'>) =>
	useAuthAction({ ...params, action: 'signIn' });
