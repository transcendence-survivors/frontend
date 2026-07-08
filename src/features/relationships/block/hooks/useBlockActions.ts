'use client';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { addBlock } from '../api/add';
import { deleteBlock } from '../api/delete';
import { Block, GetBlocksResponse } from '../types';
import { UseBlocksParams } from './useBlocks';

type BlockAction = 'add' | 'delete';

interface UseBlockActionParams {
	blockedId: string;
	action: BlockAction;
	successMessage: string;
	failureMessage: string;
	params: UseBlocksParams;
}

const blockActionFns: Record<BlockAction, (blockedId: string) => Promise<unknown>> = {
	add: addBlock,
	delete: deleteBlock,
};

const useBlockAction = ({
	blockedId,
	action,
	params,
	successMessage,
	failureMessage,
}: UseBlockActionParams) => {
	const queryClient = useQueryClient();

	const blockKey = ['blocks', params];
	const friendsKey = ['friends', params];
	const friendRequestsKey = ['friend-requests', params];

	const invalidateKeys =
		action === 'add' ? [blockKey, friendsKey, friendRequestsKey] : [blockKey];

	return useMutation({
		mutationKey: ['blocks', action, blockedId],
		mutationFn: () => blockActionFns[action](blockedId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: blockKey });

			const previous =
				queryClient.getQueryData<InfiniteData<GetBlocksResponse>>(blockKey);

			updateInfiniteQuery<Block>(
				queryClient,
				blockKey,
				(block) => block.blocked.id !== blockedId,
			);

			return { previous };
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.previous) {
				queryClient.setQueryData(blockKey, ctx.previous);
			}
			toast.error(failureMessage);
		},
		onSuccess: () => {
			toast.success(successMessage);
		},
		onSettled: async () => {
			await Promise.all(
				invalidateKeys.map((queryKey) =>
					queryClient.invalidateQueries({ queryKey }),
				),
			);
		},
	});
};

const useBlockAdd = (params: Omit<UseBlockActionParams, 'action'>) =>
	useBlockAction({ ...params, action: 'add' });

const useBlockDelete = (params: Omit<UseBlockActionParams, 'action'>) =>
	useBlockAction({ ...params, action: 'delete' });

export { useBlockAdd, useBlockDelete };
