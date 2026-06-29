'use client';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptFriendRequest } from '../api/accept';
import { FriendRequest } from '../types';
import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { toast } from 'sonner';
import { FriendRequestDirection, GetFriendRequests } from '../api/get';

interface UseRequestAcceptParams {
	friendId: string;
	friendDisplayName: string;
	direction: FriendRequestDirection;
}

const useRequestAccept = ({
	friendId,
	friendDisplayName,
	direction,
}: UseRequestAcceptParams) => {
	const queryClient = useQueryClient();
	const queryKey = ['friends', 'requests', direction];

	return useMutation({
		mutationKey: ['friends', 'accept', friendId],
		mutationFn: () => acceptFriendRequest(friendId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
			const previous =
				queryClient.getQueryData<InfiniteData<GetFriendRequests>>(queryKey);
			updateInfiniteQuery<FriendRequest>(
				queryClient,
				queryKey,
				(req) => req.friend.id !== friendId,
			);
			return { previous };
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.previous) queryClient.setQueryData(queryKey, ctx.previous);
			toast.error(
				`Failed to accept friend request from ${friendDisplayName}, please try again later.`,
			);
		},
		onSuccess: () => {
			toast.success(`Friend request from ${friendDisplayName} accepted`);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey }),
	});
};

export { useRequestAccept };
