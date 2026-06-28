'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFriendRequest } from '../api/delete';
import { FriendRequest } from '../types';
import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { toast } from 'sonner';

const useRequestDelete = (friendId: string, friendDisplayName: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['friends', 'delete', friendId],
		mutationFn: deleteFriendRequest,

		onSuccess: () => {
			updateInfiniteQuery<FriendRequest>(
				queryClient,
				['friends', 'requests', 'incoming'],
				(req) => req.friend.id !== friendId,
			);
			queryClient.invalidateQueries({
				queryKey: ['friends', 'requests'],
			});
			toast.success(`Friend request from ${friendDisplayName} deleted`);
		},
		onError: () => {
			toast.error(
				`Failed to delete friend request from ${friendDisplayName}, please try again later.`,
			);
		},
	});
};

export { useRequestDelete };
