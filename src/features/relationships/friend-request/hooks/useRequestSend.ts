'use client';

import { InfiniteData, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { sendFriendRequest } from '../api/friend-request';
import { updateInfiniteQueries } from '@/libs/api/helpers/infiniteQuery';
import { BaseUser, GetUsers } from '@/features/user/type';
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries';
import { relationshipKeys } from '../../constants/keys';

export interface UseSendFriendRequestParams {
	userId: string;
	pendingMessage: string;
	acceptedMessage: string;
	failureMessage: string;
}

export const useRequestSend = ({
	userId,
	pendingMessage,
	acceptedMessage,
	failureMessage,
}: UseSendFriendRequestParams) => {
	const { invalidate, queryClient } = useInvalidateQueries();
	const queryKey = ['users'];

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
			invalidate(relationshipKeys.status(data.data.friend.username), {
				mode: 'instant',
			});
			invalidate(['users'], { mode: 'debounce', delay: 5000 });
			const invalidateParams = {
				mode: 'debounce',
				reset: true,
				delay: 1500,
			} as const;
			if (data.data.status === 'ACCEPTED') {
				toast.success(acceptedMessage);
				invalidate(['friends'], invalidateParams);
				invalidate(['friends-count'], invalidateParams);
			} else {
				invalidate(['friend-requests', 'outgoing'], invalidateParams);
				invalidate(['friend-requests-count', 'outgoing'], invalidateParams);
				toast.success(pendingMessage);
			}
		},
		onError: (e, _, context) => {
			toast.error(failureMessage);
			if (context?.previous) {
				queryClient.setQueryData(queryKey, context.previous);
			}
		},
	});
};
