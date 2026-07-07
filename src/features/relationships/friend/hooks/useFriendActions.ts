'use client';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { toast } from 'sonner';
import { deleteFriend } from '../api/delete';
import { UseFriendsParams } from './useFriends';
import { Friend, GetFriendsResponse } from '../types';

interface UseFriendDeleteParams {
	friendId: string;
	successMessage: string;
	failureMessage: string;
	params: UseFriendsParams;
}

const useFriendDelete = ({
	friendId,
	successMessage,
	failureMessage,
	params,
}: UseFriendDeleteParams) => {
	const queryClient = useQueryClient();
	const queryKey = ['friends', { ...params }];

	return useMutation({
		mutationKey: ['friends', 'delete', friendId],
		mutationFn: () => deleteFriend(friendId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
			const previous =
				queryClient.getQueryData<InfiniteData<GetFriendsResponse>>(queryKey);
			updateInfiniteQuery<Friend>(
				queryClient,
				queryKey,
				(req) => req.friend.id !== friendId,
			);
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

export { useFriendDelete };
