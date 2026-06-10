import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { REDIRECTED_URLS } from '@/modules/i18n/constants/routes';
import { signInEmail, signInUsername } from '../api/signIn';
import { type User } from '../schemas/user.schema';
import { ApiResponse } from '@/libs/api/types';

interface useSignInMessages {
	successMessage: string;
}

const useSignIn = <TVariables, TData extends ApiResponse<User>, TError>(
	mutationFn: (variables: TVariables) => Promise<TData>,
	messages: useSignInMessages,
) => {
	const router = useRouter();
	return useMutation<TData, TError, TVariables>({
		mutationFn,
		onSuccess: (data) => {
			toast.success(messages.successMessage);
			const url = new URLSearchParams(window.location.search);
			const redirect =
				url.get(REDIRECTED_URLS.callbackKey) || REDIRECTED_URLS.profile;
			router.replace(redirect);
		},
	});
};

const useSignInEmail = (messages: useSignInMessages) => {
	return useSignIn(signInEmail, messages);
};
const useSignInUsername = (messages: useSignInMessages) => {
	return useSignIn(signInUsername, messages);
};

export { useSignInEmail, useSignInUsername };
