import { BaseUser } from '@/features/user/type';
import { CursorParams, CursorResponse } from '@/libs/api/helpers/types';

export type ChatMemberRole = 'OWNER' | 'ADMIN' | 'MEMBER';

export interface ChatMember {
	id: string;
	roomId: string;
	role: ChatMemberRole;
	joinedAt: string;
	user: BaseUser;
}

export type ChatMemberOrderBy =
	| 'username-asc'
	| 'username-desc'
	| 'displayname-asc'
	| 'displayname-desc'
	| 'joined-asc'
	| 'joined-desc'
	| 'role-asc'
	| 'role-desc';

export type GetChatMembersParams = CursorParams<ChatMemberOrderBy>;
export type GetChatMembersResponse = CursorResponse<ChatMember[]>;

export interface GetChatMembersCountParams {
	search?: string;
}
