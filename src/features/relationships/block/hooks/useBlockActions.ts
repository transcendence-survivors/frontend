'use client';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateInfiniteQueries } from '@/libs/api/helpers/infiniteQuery';
import { addBlock } from '../api/add';
import { deleteBlock } from '../api/delete';
import { Block, GetBlocksResponse } from '../types';
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries';

type BlockAction = 'add' | 'delete';

interface UseBlockActionParams {
	blockedId: string;
	action: BlockAction;
	successMessage: string;
	failureMessage: string;
}

const blockActionFns: Record<BlockAction, (blockedId: string) => Promise<unknown>> = {
	add: addBlock,
	delete: deleteBlock,
};

const useBlockAction = ({
	blockedId,
	action,
	successMessage,
	failureMessage,
}: UseBlockActionParams) => {
	const { invalidate, queryClient } = useInvalidateQueries();

	const blockKey = ['blocks'];
	const blockCountKey = ['blocks-count'];
	const friendsKey = ['friends'];
	const friendCountKey = ['friends-count'];
	const friendRequestsKey = ['friend-requests'];
	const friendRequestsCountKey = ['friend-requests-count'];

	const invalidateKeys =
		action === 'add'
			? [
					blockKey,
					blockCountKey,
					friendsKey,
					friendCountKey,
					friendRequestsKey,
					friendRequestsCountKey,
				]
			: [];

	return useMutation({
		mutationKey: ['blocks', action, blockedId],
		mutationFn: () => blockActionFns[action](blockedId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: blockKey });
			const previous =
				queryClient.getQueryData<InfiniteData<GetBlocksResponse>>(blockKey);
			updateInfiniteQueries<Block>(queryClient, blockKey, {
				type: 'filter',
				callback: (block) => block.blocked.id !== blockedId,
			});
			return { previous };
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.previous) queryClient.setQueryData(blockKey, ctx.previous);
			toast.error(failureMessage);
		},
		onSuccess: () => {
			toast.success(successMessage);
		},
		onSettled: async () => {
			await Promise.all(
				invalidateKeys.map((queryKey) =>
					invalidate(queryKey, { mode: 'instant', reset: true }),
				),
			);
			invalidate(blockKey, { mode: 'instant' });
			invalidate(blockCountKey, { mode: 'instant' });
		},
	});
};

const useBlockAdd = (params: Omit<UseBlockActionParams, 'action'>) =>
	useBlockAction({ ...params, action: 'add' });

const useBlockDelete = (params: Omit<UseBlockActionParams, 'action'>) =>
	useBlockAction({ ...params, action: 'delete' });

export { useBlockAdd, useBlockDelete };
