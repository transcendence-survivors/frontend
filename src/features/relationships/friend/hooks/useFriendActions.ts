'use client';

import { InfiniteData, useMutation } from '@tanstack/react-query';
import { updateInfiniteQueries } from '@/libs/api/helpers/infiniteQuery';
import { toast } from 'sonner';
import { deleteFriend } from '../api/delete';
import { Friend, GetFriendsResponse } from '../types';
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries';

interface UseFriendDeleteParams {
	friendId: string;
	successMessage: string;
	failureMessage: string;
}

const useFriendDelete = ({
	friendId,
	successMessage,
	failureMessage,
}: UseFriendDeleteParams) => {
	const { invalidate, queryClient } = useInvalidateQueries();
	const queryKey = ['friends'];

	return useMutation({
		mutationKey: ['friends', 'delete', friendId],
		mutationFn: () => deleteFriend(friendId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
			const previous =
				queryClient.getQueryData<InfiniteData<GetFriendsResponse>>(queryKey);
			updateInfiniteQueries<Friend>(queryClient, queryKey, {
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
			invalidate(['friends-count'], { mode: 'instant' });
			invalidate(['users'], { mode: 'instant', reset: true });
		},
	});
};

export { useFriendDelete };
