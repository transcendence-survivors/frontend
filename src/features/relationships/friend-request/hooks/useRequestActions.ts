'use client';

import { InfiniteData, useMutation } from '@tanstack/react-query';
import { updateInfiniteQueries } from '@/libs/api/helpers/infiniteQuery';
import { toast } from 'sonner';
import { acceptFriendRequest } from '../api/accept';
import { deleteFriendRequest } from '../api/delete';
import { GetFriendRequests, FriendRequest, UseRequestsParams } from '../types';
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries';

type FriendRequestAction = 'accept' | 'delete';

interface UseRequestActionParams {
	friendId: string;
	action: FriendRequestAction;
	successMessage: string;
	failureMessage: string;
	direction: UseRequestsParams['direction'];
}

const requestActionFns: Record<
	FriendRequestAction,
	(friendId: string) => Promise<unknown>
> = {
	accept: acceptFriendRequest,
	delete: deleteFriendRequest,
};

const useRequestAction = ({
	friendId,
	action,
	successMessage,
	failureMessage,
	direction,
}: UseRequestActionParams) => {
	const { invalidate, queryClient } = useInvalidateQueries();
	const queryKey = ['friend-requests', direction];
	const countQueryKey = ['friend-requests-count', direction];

	return useMutation({
		mutationKey: ['friend-requests', action, friendId],
		mutationFn: () => requestActionFns[action](friendId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
			const previous =
				queryClient.getQueryData<InfiniteData<GetFriendRequests>>(queryKey);
			updateInfiniteQueries<FriendRequest>(queryClient, queryKey, {
				type: 'filter',
				callback: (req) => req.friend.id !== friendId,
			});
			return { previous };
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.previous) queryClient.setQueryData(queryKey, ctx.previous);
			toast.error(failureMessage);
		},
		onSuccess: () => toast.success(successMessage),
		onSettled: () => {
			invalidate(queryKey, { mode: 'instant' });
			invalidate(countQueryKey, { mode: 'instant' });
		},
	});
};

const useRequestAccept = (params: Omit<UseRequestActionParams, 'action'>) =>
	useRequestAction({ ...params, action: 'accept' });

const useRequestDelete = (params: Omit<UseRequestActionParams, 'action'>) =>
	useRequestAction({ ...params, action: 'delete' });

export { useRequestAccept, useRequestDelete };
