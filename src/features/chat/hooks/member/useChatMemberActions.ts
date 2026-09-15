'use client';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	kickChatMember,
	leaveChatRoom,
	transferChatRoomOwnership,
	updateChatMemberRole,
} from '../../api/member';
import { updateInfiniteQuery } from '@/libs/api/helpers/infiniteQuery';
import { ChatMember, ChatMemberRole, GetChatMembersResponse } from '../../types/member';
import { UseChatMembersParams } from './useChatMembers';
import { ROUTES } from '@/modules/i18n/constants/routes';
import { useRouter } from 'next/navigation';

export type MemberAction = 'kick' | 'promote' | 'demote' | 'transfer' | 'leave';

interface UseChatMemberActionParams {
	roomId: string;
	action: MemberAction;
	targetUserId?: string;
	role?: ChatMemberRole;
	params?: UseChatMembersParams;
}

const useChatMemberAction = ({
	roomId,
	targetUserId,
	params,
	action,
	role,
}: UseChatMemberActionParams) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const queryKey = ['chat-members', roomId, params];

	return useMutation({
		mutationKey: ['chat-members', action, roomId, targetUserId ?? 'me'],
		mutationFn: async () => {
			switch (action) {
				case 'kick':
					return kickChatMember(roomId, targetUserId!);
				case 'promote':
				case 'demote':
					return updateChatMemberRole(roomId, targetUserId!, role!);
				case 'transfer':
					return transferChatRoomOwnership(roomId, targetUserId!);
				case 'leave':
					return leaveChatRoom(roomId);
			}
		},
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey, exact: true });

			const previous =
				queryClient.getQueryData<InfiniteData<GetChatMembersResponse>>(queryKey);

			if (action === 'kick') {
				updateInfiniteQuery<ChatMember>(queryClient, queryKey, {
					type: 'filter',
					callback: (m) => m.user.id !== targetUserId,
				});
			} else if (
				(action === 'promote' || action === 'demote') &&
				role &&
				targetUserId
			) {
				updateInfiniteQuery<ChatMember>(queryClient, queryKey, {
					type: 'map',
					callback: (m) => (m.user.id === targetUserId ? { ...m, role } : m),
				});
			} else if (action === 'transfer' && targetUserId) {
				updateInfiniteQuery<ChatMember>(queryClient, queryKey, {
					type: 'map',
					callback: (m) => {
						if (m.user.id === targetUserId) return { ...m, role: 'OWNER' };
						if (m.role === 'OWNER') return { ...m, role: 'ADMIN' };
						return m;
					},
				});
			}

			return { previous };
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.previous) {
				queryClient.setQueryData(queryKey, ctx.previous);
			}
		},
		onSuccess: () => {
			if (action === 'leave') {
				router.push(ROUTES.chat());
				router.refresh();
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['chat-members', roomId] });
			queryClient.invalidateQueries({ queryKey: ['chat-rooms'] });
		},
	});
};

export const useKickMember = (
	roomId: string,
	targetUserId: string,
	params?: UseChatMembersParams,
) =>
	useChatMemberAction({
		roomId,
		targetUserId,
		params,
		action: 'kick',
	});

export const useUpdateMemberRole = (
	roomId: string,
	targetUserId: string,
	role: ChatMemberRole,
	isPromotion: boolean,
	params?: UseChatMembersParams,
) =>
	useChatMemberAction({
		roomId,
		targetUserId,
		params,
		action: isPromotion ? 'promote' : 'demote',
		role,
	});

export const useTransferOwnership = (
	roomId: string,
	targetUserId: string,
	params?: UseChatMembersParams,
) =>
	useChatMemberAction({
		roomId,
		targetUserId,
		params,
		action: 'transfer',
	});

export const useLeaveRoom = (roomId: string, params?: UseChatMembersParams) =>
	useChatMemberAction({
		roomId,
		params,
		action: 'leave',
	});
