'use client';

import { useMutation } from '@tanstack/react-query';
import { createChatRoom } from '../api/create';
import { UseChatRoomsParams } from './useChatRooms';
import { queryClient } from '@/components/providers/QuerryProvider';
import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { ChatRoom } from '../types/room';
import { isApiError } from '@/libs/api';
import { deleteRoom } from '../api/rooms';

type UseChatRoomCreateParams = {
	params: UseChatRoomsParams;
	onMutationSuccess?: () => void;
	usersIds: string[];
	name?: string;
};

const useChatRoomCreate = ({ params, usersIds, name }: UseChatRoomCreateParams) => {
	const roomsQueryKeys = ['chat-rooms', params];

	return useMutation({
		mutationKey: ['chat-rooms', { usersIds, name }],
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

const useChatRoomDelete = (roomId: string, params: UseChatRoomsParams) => {
	const roomsQueryKeys = ['chat-rooms', params];

	return useMutation({
		mutationKey: ['chat-rooms', 'delete', roomId],
		mutationFn: async () => deleteRoom(roomId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: roomsQueryKeys });
			const previous = queryClient.getQueryData(roomsQueryKeys);
			updateInfiniteQuery<ChatRoom>(queryClient, roomsQueryKeys, {
				type: 'filter',
				callback: (room) => room.id !== roomId,
			});
			return { previous };
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.previous) queryClient.setQueryData(roomsQueryKeys, ctx.previous);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: roomsQueryKeys });
		},
	});
};

export { useChatRoomCreate, useChatRoomDelete };
