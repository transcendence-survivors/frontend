'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { CALLBACK_KEY, ROUTES } from '@/modules/i18n/constants/routes';
import { useSessionActions } from '../stores/session';
import { signUp } from '../api/signUp.api';
import { signInUsernameEmail } from '../api/signIn.api';
import { stripLocale } from '@/modules/i18n/utils/resolve';
import { useSearchParams } from 'next/navigation';

const authActionFns = {
	signUp: signUp,
	signIn: signInUsernameEmail,
} as const;

type AuthAction = keyof typeof authActionFns;

interface UseAuthActionParams<TAction extends AuthAction> {
	action: TAction;
	successMessage: string;
}

const isSafeRelativeUrl = (url: string) => {
	return url.startsWith('/') && !url.startsWith('//');
};

const useAuthAction = <TAction extends AuthAction>({
	action,
	successMessage,
}: UseAuthActionParams<TAction>) => {
	const { setUser } = useSessionActions();
	const router = useRouter();
	const searchParams = useSearchParams();

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

			const rawCallbackUrl = searchParams.get(CALLBACK_KEY);
			if (rawCallbackUrl && isSafeRelativeUrl(rawCallbackUrl)) {
				const targetPath = stripLocale(rawCallbackUrl);

				if (isSafeRelativeUrl(targetPath)) {
					router.replace(targetPath);
					return;
				}
			}
			const defaultRoute = ROUTES.userName({ username: `@${res.data.username}` });
			router.replace(defaultRoute);
		},
	});
};

export const useSignUp = (params: Omit<UseAuthActionParams<'signUp'>, 'action'>) =>
	useAuthAction({ ...params, action: 'signUp' });

export const useSignIn = (params: Omit<UseAuthActionParams<'signIn'>, 'action'>) =>
	useAuthAction({ ...params, action: 'signIn' });
