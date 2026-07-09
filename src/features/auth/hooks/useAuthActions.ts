'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { REDIRECTED_URLS } from '@/modules/i18n/constants/routes';
import { useSessionActions } from '../stores/session';
import { signUp } from '../api/signUp.api';
import { signInUsernameEmail } from '../api/signIn.api';

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
			const redirect =
				url.get(REDIRECTED_URLS.callbackKey) ||
				REDIRECTED_URLS.profile.replace(':username', `@${res.data.username}`);

			router.replace(redirect);
		},
	});
};

export const useSignUp = (params: Omit<UseAuthActionParams<'signUp'>, 'action'>) =>
	useAuthAction({ ...params, action: 'signUp' });

export const useSignIn = (params: Omit<UseAuthActionParams<'signIn'>, 'action'>) =>
	useAuthAction({ ...params, action: 'signIn' });
