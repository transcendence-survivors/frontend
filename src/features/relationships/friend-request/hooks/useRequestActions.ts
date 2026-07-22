'use client';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { toast } from 'sonner';
import { acceptFriendRequest } from '../api/accept';
import { deleteFriendRequest } from '../api/delete';
import { GetFriendRequests, FriendRequest, UseRequestsParams } from '../types';

type FriendRequestAction = 'accept' | 'delete';

interface UseRequestActionParams {
	friendId: string;
	action: FriendRequestAction;
	successMessage: string;
	failureMessage: string;
	params: UseRequestsParams;
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
	params,
	action,
	successMessage,
	failureMessage,
}: UseRequestActionParams) => {
	const queryClient = useQueryClient();
	const queryKey = ['friend-requests', params];

	return useMutation({
		mutationKey: ['friends', action, friendId],
		mutationFn: () => requestActionFns[action](friendId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
			const previous =
				queryClient.getQueryData<InfiniteData<GetFriendRequests>>(queryKey);
			updateInfiniteQuery<FriendRequest>(queryClient, queryKey, {
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
		onSettled: () => queryClient.invalidateQueries({ queryKey }),
	});
};

const useRequestAccept = (params: Omit<UseRequestActionParams, 'action'>) =>
	useRequestAction({ ...params, action: 'accept' });

const useRequestDelete = (params: Omit<UseRequestActionParams, 'action'>) =>
	useRequestAction({ ...params, action: 'delete' });

export { useRequestAccept, useRequestDelete };
