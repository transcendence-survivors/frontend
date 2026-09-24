'use client';

import { InfiniteData, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { sendFriendRequest } from '../api/send';
import { UseUsersParams } from '@/features/user/hooks/useUsers';
import { updateInfiniteQueries } from '@/libs/api/helpers/infiniteQuery';
import { BaseUser, GetUsers } from '@/features/user/type';
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries';

export interface UseSendFriendRequestParams {
	userId: string;
	params: UseUsersParams;
	pendingMessage: string;
	acceptedMessage: string;
	failureMessage: string;
}

const useRequestSend = ({
	userId,
	params,
	pendingMessage,
	acceptedMessage,
	failureMessage,
}: UseSendFriendRequestParams) => {
	const { invalidate, queryClient } = useInvalidateQueries();
	const queryKey = ['users', params];

	return useMutation({
		mutationKey: ['friends', 'send', userId],
		mutationFn: () => sendFriendRequest(userId),

		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
			const previous = queryClient.getQueryData<InfiniteData<GetUsers>>(queryKey);
			updateInfiniteQueries<BaseUser>(queryClient, queryKey, {
				type: 'filter',
				callback: (req) => req.id !== userId,
			});
			return { previous };
		},
		onSuccess: (data) => {
			if (data.data.status === 'ACCEPTED') {
				toast.success(acceptedMessage);
				invalidate(['users'], { mode: 'instant' });
				invalidate(['friend-requests'], { mode: 'instant' });
				invalidate(['friends'], { mode: 'instant' });
			} else {
				toast.success(pendingMessage);
				invalidate(queryKey, { mode: 'instant' });
			}
		},
		onError: (e, _, context) => {
			toast.error(failureMessage);
			if (context?.previous) {
				queryClient.setQueryData(queryKey, context.previous);
			}
		},
		onSettled: () => invalidate(queryKey, { mode: 'instant' }),
	});
};

export { useRequestSend };
