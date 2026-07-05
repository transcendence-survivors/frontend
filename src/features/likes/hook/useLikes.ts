import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addLike, deleteLike, fetchLikeCount } from '../api/likes';

export function useLikeAdd() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addLike,
		onSuccess: (data, postId) => {
			queryClient.invalidateQueries({ queryKey: ['likes', postId] });
		},
	});
}

export function useDeleteLike() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteLike,
		onSuccess: (data, postId) => {
			queryClient.invalidateQueries({ queryKey: ['likes', postId] });
		},
	});
}

export function useLikeCount(postId: string) {
	return useQuery({
		queryKey: ['likes', postId],
		queryFn: () => fetchLikeCount(postId),
	});
}
