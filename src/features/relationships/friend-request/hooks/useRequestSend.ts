'use client';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { sendFriendRequest } from '../api/send';
import { UseUsersParams } from '@/features/user/hooks/useUsers';
import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { BaseUser, GetUsers } from '@/features/user/type';

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
	const queryClient = useQueryClient();
	const queryKey = ['users', params];

	return useMutation({
		mutationKey: ['friends', 'send', userId],
		mutationFn: () => sendFriendRequest(userId),

		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
			const previous = queryClient.getQueryData<InfiniteData<GetUsers>>(queryKey);
			updateInfiniteQuery<BaseUser>(queryClient, queryKey, {
				type: 'filter',
				callback: (req) => req.id !== userId,
			});
			return { previous };
		},
		onSuccess: (data) => {
			if (data.data.status === 'ACCEPTED') {
				toast.success(acceptedMessage);
				queryClient.invalidateQueries({ queryKey: ['users'] });
				queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
				queryClient.invalidateQueries({ queryKey: ['friends'] });
			} else {
				toast.success(pendingMessage);
				queryClient.invalidateQueries({ queryKey });
			}
		},
		onError: (e, _, context) => {
			toast.error(failureMessage);
			if (context?.previous) {
				queryClient.setQueryData(queryKey, context.previous);
			}
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey }),
	});
};

export { useRequestSend };
