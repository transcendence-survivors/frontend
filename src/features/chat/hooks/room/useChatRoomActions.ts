'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { ChatRoom } from '../../types/room';
import { isApiError } from '@/libs/api';
import {
	ChatRoomPatchPayload,
	createChatRoom,
	deleteRoom,
	patchChatRoom,
} from '../../api/rooms';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/modules/i18n/constants/routes';

type UseChatRoomCreateParams = {
	onMutationSuccess?: () => void;
	usersIds: string[];
	name?: string;
};

export const useChatRoomCreate = ({ usersIds, name }: UseChatRoomCreateParams) => {
	const queryClient = useQueryClient();
	const roomsQueryKeys = ['chat-rooms'];

	return useMutation({
		mutationKey: ['chat-rooms', 'create', { usersIds, name }],
		mutationFn: createChatRoom,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: roomsQueryKeys });
		},
		onSuccess: (data) => {
			if (isApiError(data)) return;
			queryClient.invalidateQueries({ queryKey: roomsQueryKeys });
		},
	});
};

export const useChatRoomDelete = (roomId: string) => {
	const queryClient = useQueryClient();
	const roomsQueryKeys = ['chat-rooms'];
	const router = useRouter();

	return useMutation({
		mutationKey: ['chat-rooms', 'delete', roomId],
		mutationFn: async () => deleteRoom(roomId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: roomsQueryKeys, exact: true });
			const previous = queryClient.getQueryData(roomsQueryKeys);

			updateInfiniteQuery<ChatRoom>(queryClient, roomsQueryKeys, {
				type: 'filter',
				callback: (room) => room.id !== roomId,
			});

			return { previous };
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.previous) {
				queryClient.setQueryData(roomsQueryKeys, ctx.previous);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: roomsQueryKeys });
		},
		onSuccess: () => {
			router.push(ROUTES.chat());
			router.refresh();
		},
	});
};

export const useChatRoomEdit = (roomId: string) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationKey: ['chat-rooms', 'edit', roomId],
		mutationFn: (params: ChatRoomPatchPayload) => patchChatRoom(roomId, params),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['chat-rooms'] });
			router.refresh();
		},
	});
};
