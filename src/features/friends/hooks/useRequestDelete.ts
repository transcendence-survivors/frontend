'use client';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFriendRequest } from '../api/delete';
import { FriendRequest } from '../types';
import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { toast } from 'sonner';
import { GetFriendRequests } from '../api/get';

interface UseRequestDeleteParams {
	friendId: string;
	friendDisplayName: string;
	direction: 'incoming' | 'outgoing';
}

const useRequestDelete = ({
	friendId,
	friendDisplayName,
	direction,
}: UseRequestDeleteParams) => {
	const queryClient = useQueryClient();
	const queryKey = ['friends', 'requests', direction];

	return useMutation({
		mutationKey: ['friends', 'delete', friendId],
		mutationFn: () => deleteFriendRequest(friendId),
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
				`Failed to delete friend request from ${friendDisplayName}, please try again later.`,
			);
		},
		onSuccess: () => {
			toast.success(`Friend request from ${friendDisplayName} deleted`);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey }),
	});
};

export { useRequestDelete };
