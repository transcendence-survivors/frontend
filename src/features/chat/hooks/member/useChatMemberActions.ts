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

export type MemberAction = 'kick' | 'promote' | 'demote' | 'transfer' | 'leave';

interface UseChatMemberActionParams {
	roomId: string;
	params?: UseChatMembersParams;
	targetUserId: string;
	action: MemberAction;
	role?: ChatMemberRole;
}

const useChatMemberAction = ({
	roomId,
	targetUserId,
	params,
	action,
	role,
}: UseChatMemberActionParams) => {
	const queryClient = useQueryClient();
	const queryKey = ['chat-members', params];

	return useMutation({
		mutationKey: ['chat-members', action, roomId, targetUserId],
		mutationFn: async () => {
			switch (action) {
				case 'kick':
					return kickChatMember(roomId, targetUserId);
				case 'promote':
				case 'demote':
					if (!role) throw new Error('Role is required for role update');
					return updateChatMemberRole(roomId, targetUserId, role);
				case 'transfer':
					return transferChatRoomOwnership(roomId, targetUserId);
				case 'leave':
					return leaveChatRoom(roomId);
			}
		},
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
			const previous =
				queryClient.getQueryData<InfiniteData<GetChatMembersResponse>>(queryKey);

			if (action === 'kick' || action === 'leave') {
				updateInfiniteQuery<ChatMember>(queryClient, queryKey, {
					type: 'filter',
					callback: (m) => m.user.id !== targetUserId,
				});
			} else if ((action === 'promote' || action === 'demote') && role) {
				updateInfiniteQuery<ChatMember>(queryClient, queryKey, {
					type: 'map',
					callback: (m) => (m.user.id === targetUserId ? { ...m, role } : m),
				});
			} else if (action === 'transfer') {
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
			if (ctx?.previous) queryClient.setQueryData(queryKey, ctx.previous);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['chat-members'] });
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

export const useLeaveRoom = (
	roomId: string,
	currentUserId: string,
	params?: UseChatMembersParams,
) =>
	useChatMemberAction({
		roomId,
		targetUserId: currentUserId,
		params,
		action: 'leave',
	});
