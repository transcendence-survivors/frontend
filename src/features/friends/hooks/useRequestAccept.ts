'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptFriendRequest } from '../api/accept';
import { FriendRequest } from '../types';
import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { toast } from 'sonner';

const useRequestAccept = (friendId: string, friendDisplayName: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['friends', 'accept', friendId],
		mutationFn: acceptFriendRequest,

		onSuccess: () => {
			updateInfiniteQuery<FriendRequest>(
				queryClient,
				['friends', 'requests', 'incoming'],
				(req) => req.friend.id !== friendId,
			);
			queryClient.invalidateQueries({
				queryKey: ['friends', 'requests', 'incoming'],
			});
			toast.success('Friend request from ${friendDisplayName} accepted');
		},
		onError: () => {
			toast.error(
				`Failed to accept friend request from ${friendDisplayName}, please try again later.`,
			);
		},
	});
};

export { useRequestAccept };
