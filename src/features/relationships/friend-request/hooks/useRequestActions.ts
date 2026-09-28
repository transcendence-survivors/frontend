'use client';

import { InfiniteData, useMutation } from '@tanstack/react-query';
import { updateInfiniteQueries } from '@/libs/api/helpers/infiniteQuery';
import { toast } from 'sonner';
import { acceptFriendRequest, deleteFriendRequest } from '../api/friend-request';
import { GetFriendRequests, FriendRequest, UseRequestsParams } from '../types';
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries';
import { relationshipKeys } from '../../constants/keys';
import { BaseUser } from '@/features/user/type';

type FriendRequestAction = 'accept' | 'delete';

interface UseRequestActionParams {
	user: Pick<BaseUser, 'id' | 'username'>;
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
	user,
	action,
	successMessage,
	failureMessage,
	direction,
}: UseRequestActionParams) => {
	const { invalidate, queryClient } = useInvalidateQueries();
	const queryKey = ['friend-requests', direction];
	const countQueryKey = ['friend-requests-count', direction];

	return useMutation({
		mutationKey: ['friend-requests', action, user.id],
		mutationFn: () => requestActionFns[action](user.id),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
			const previous =
				queryClient.getQueryData<InfiniteData<GetFriendRequests>>(queryKey);
			updateInfiniteQueries<FriendRequest>(queryClient, queryKey, {
				type: 'filter',
				callback: (req) => req.friend.id !== user.id,
			});
			return { previous };
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.previous) queryClient.setQueryData(queryKey, ctx.previous);
			toast.error(failureMessage);
		},
		onSuccess: () => {
			toast.success(successMessage);
			if (action === 'delete') {
				invalidate(['users'], { mode: 'debounce', delay: 1500, reset: true });
			}
			invalidate(queryKey, { mode: 'debounce', delay: 1500 });
			invalidate(countQueryKey, { mode: 'instant' });
			invalidate(relationshipKeys.status(user.username), { mode: 'instant' });
		},
	});
};

export const useRequestAccept = (params: Omit<UseRequestActionParams, 'action'>) =>
	useRequestAction({ ...params, action: 'accept' });

export const useRequestDelete = (params: Omit<UseRequestActionParams, 'action'>) =>
	useRequestAction({ ...params, action: 'delete' });
